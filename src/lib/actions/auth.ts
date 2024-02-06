"use server"
import { getUserByEmail } from "@/data/user";
import { LoginSchema, RegisterSchema } from "@/schemas";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";
import bcrypt from 'bcryptjs'
import { db } from "../db";
import { generateTwoFactorToken, generateVerificationToken } from "./tokens";
import { sendTwoFactorEmail, sendVerificationEmail } from "./send-mails";
import { signIn, signOut } from "@/auth";
import { State } from "../definitions";
import { getTwoFactorTokenByEmail } from "@/data/two-factor-token";
import { getTwoFactorConfirmationByUserId } from "@/data/two-factor-confirmation";
import { cookies } from "next/headers";

//
export async function logout(){
    cookies().delete("authjs.session-token");
    await signOut();
}

//
export async function login(prevState: State, formData: FormData): Promise<State> {
    const validatedFields  = LoginSchema.safeParse({
        email: formData.get('email'),
        password: formData.get('password'),
        code: formData.get('code')||undefined
    });
    

    if(!validatedFields.success){
        return {error: "Invalid fields!"};
    }
    const { email, password, code } = validatedFields.data;

    const existingUser = await getUserByEmail(email);
    if(!existingUser || !existingUser.email || !existingUser.password){
        return {error: "Email does not exist!"};
    }
    if(!existingUser.emailVerified){
        const verificationToken = await generateVerificationToken(existingUser.email);
        await sendVerificationEmail(verificationToken.email, verificationToken.token);
        return {message: "Confirmation email sent!"}
    }
    
    
    if(existingUser.isTwoFactorEnabled && existingUser.email && existingUser.emailVerified){
        if(code){
            const twoFactorToken = await getTwoFactorTokenByEmail(existingUser.email);
            if(!twoFactorToken || twoFactorToken.token !== code){
                return {error: "Invalid code!"};
            }
            if(twoFactorToken.expires < new Date()){
                return {error: "Code expired!"};
            }
            await db.twoFactorToken.delete({
                where: {id: twoFactorToken.id}
            });

            const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id);
            if(twoFactorConfirmation){
                await db.twoFactorConfirmation.delete({
                    where: {id: twoFactorConfirmation.id}
                });
            }
            await db.twoFactorConfirmation.create({
                data: {
                    userId: existingUser.id
                }
            })
        }
        else{
            const twoFactorToken = await generateTwoFactorToken(existingUser.email);
            await sendTwoFactorEmail(twoFactorToken.email, twoFactorToken.token);
            return { twoFactor: true }
        }
    }

    try {
        await signIn("credentials", {
            email,
            password,
            redirectTo: DEFAULT_LOGIN_REDIRECT
        })
        return {message: "Your are logged in"}
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return {error:'Invalid credentials.'};
                default:
                    return {error:'Something went wrong.'};
            }
        }
        throw error;
    }
}

//
export async function register(prevState: State, formData: FormData): Promise<State> {
    try {
        const validatedFields  = RegisterSchema.safeParse({
            email: formData.get('email'),
            password: formData.get('password'),
            name: formData.get('name')
        });
        if(!validatedFields.success){
            return {
                errors: validatedFields.error.flatten().fieldErrors,
                error: "Registration failed"
            };
        }
        const { email, name, password } = validatedFields.data;
        const hashedPassword = await bcrypt.hash(password, 10);
    
        const existingUser = await getUserByEmail(email);
        
        if(existingUser){
            return {
                errors: {
                    email: ["Email already in use!"]
                },
                error: 'Registration failed'
            };
        }
    
        await db.user.create({
            data:{
                name,
                email,
                password: hashedPassword
            },
        })
        const verificationToken = await generateVerificationToken(email);
        sendVerificationEmail(verificationToken.email, verificationToken.token);
    
        return {
            message: 'Confirmation email sent!'
        };
    } catch (error) {
        return {error:'Something went wrong.'};
    }
}