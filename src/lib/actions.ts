'use server'
import { AuthError } from "next-auth";
import { signIn } from "../auth";
import { LoginSchema, NewPasswordSchema, RegisterSchema, ResetPasswordSchema, State } from "@/schemas";
import bcrypt from 'bcryptjs'
import { db } from "./db";
import { getUserByEmail } from "@/data/user";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { PasswordResetToken, VerificationToken } from "@prisma/client";
import { getVerificationTokenByEmail, getVerificationTokenByToken } from "@/data/verification-token";
import { randomUUID } from "crypto";
import { Resend } from "resend";
import { getPasswordResetTokenByEmail, getPasswordResetTokenByToken } from "@/data/password-resest-token";

const resend = new Resend(process.env.RESENT_API_KEY);

//
export async function sendVerificationEmail(email: string, token: string){
    const confirmLink = `${process.env.BASE_URL}/auth/new-verification?token=${token}`;
    await resend.emails.send({
        from: "onboarding@resend.dev",
        to: email,
        subject: "Confirm your email",
        html: `<p>Click <a href="${confirmLink}">here</a> to confirm email.</p>`
    });
};

//
export async function sendResetPasswordEmail(email: string, token: string){
    const confirmLink = `${process.env.BASE_URL}/auth/new-password?token=${token}`;
    await resend.emails.send({
        from: "onboarding@resend.dev",
        to: email,
        subject: "Reset your password",
        html: `<p>Click <a href="${confirmLink}">here</a> to reset password.</p>`
    });
};

//
export async function resetPassword(prevState: State, formData: FormData): Promise<State>{
    const validatedFields = ResetPasswordSchema.safeParse({
        email: formData.get("email")
    });
    if(!validatedFields.success){
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            error: "Reset password failed"
        }
    }
    const { email } = validatedFields.data;

    const existingUser = await getUserByEmail(email);
    if(!existingUser) return { error: "Email not found!"};

    const verificationToken = await generatePasswordResetToken(email);
    sendResetPasswordEmail(verificationToken.email, verificationToken.token);

    return {message: "Reset email sent!"}
};

//
export async function newPassword(prevState: State, formData: FormData): Promise<State>{
    const validatedFields = NewPasswordSchema.safeParse({
        password: formData.get("password"),
        token: formData.get("token"),
    });
    if(!validatedFields.success){
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            error: "Reset password failed"
        }
    }
    const { password, token } = validatedFields.data;

    const passwordResetToken = await getPasswordResetTokenByToken(token);
    if(!passwordResetToken) return { error: "Token does not exist!"};

    const isExpired = passwordResetToken.expires < new Date();
    if(isExpired) return { error: "Token has expired!"};

    const existingUser = await getUserByEmail(passwordResetToken.email);
    if(!existingUser) return { error: "Email not found!"};

    const hashedPassword = await bcrypt.hash(password, 10);
    await db.user.update({
        where:{ id: existingUser.id },
        data:{ password: hashedPassword }
    });
    await db.passwordResetToken.delete({
        where:{ id: passwordResetToken.id }
    });

    return { message: "Password updated!" };
};

//
export async function newVerification(token: string): Promise<State>{
    const verificationToken = await getVerificationTokenByToken(token);
    if(!verificationToken) return { error: "Token does not exist!"};

    const isExpired = verificationToken.expires < new Date();
    if(isExpired) return { error: "Token has expired!"};
    
    const email = verificationToken?.email;
    const user = await getUserByEmail(email);
    if(!user) return { error: "Email does not exist in our database!"} ;

    await db.user.update({
        where:{
            id: user.id
        },
        data:{
            emailVerified: new Date(),
            email: verificationToken.email
        }
    })
    await db.verificationToken.delete({
        where:{
            id: verificationToken.id
        }
    })
    return { message: "Email verified!"};
};

//
export async function generateVerificationToken(email: string): Promise<VerificationToken>{
    const token = randomUUID();
    const expires = new Date(new Date().getTime()+3600*1000);

    const existingToken = await getVerificationTokenByEmail(email);
    if(existingToken){
        await db.verificationToken.delete({
            where:{
                id: existingToken.id
            }
        })
    }
    const verificationToken = await db.verificationToken.create({
        data:{
            email: email,
            expires: expires,
            token: token
        }
    })
    return verificationToken;
}

//
export async function generatePasswordResetToken(email: string): Promise<PasswordResetToken>{
    const token = randomUUID();
    const expires = new Date(new Date().getTime()+3600*1000);

    const existingToken = await getPasswordResetTokenByEmail(email);
    if(existingToken){
        await db.passwordResetToken.delete({
            where:{
                id: existingToken.id
            }
        })
    }
    const passwordResetToken = await db.passwordResetToken.create({
        data:{
            email: email,
            expires: expires,
            token: token
        }
    })
    return passwordResetToken;
}

//
export async function login(prevState: State, formData: FormData): Promise<State> {
    const validatedFields  = LoginSchema.safeParse({
        email: formData.get('email'),
        password: formData.get('password'),
    });

    if(!validatedFields.success){
        return {error: "Invalid fields!"};
    }
    
    const { email, password } = validatedFields.data;

    const existingUser = await getUserByEmail(email);
    if(!existingUser || !existingUser.email || !existingUser.password){
        return {error: "Email does not exist!"};
    }
    if(!existingUser.emailVerified){
        const verificationToken = await generateVerificationToken(existingUser.email);
        await sendVerificationEmail(verificationToken.email, verificationToken.token);
        return {message: "Confirmation email sent!"}
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