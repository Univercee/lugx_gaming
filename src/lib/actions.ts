'use server'
import { AuthError } from "next-auth";
import { signIn } from "../auth";
import { LoginSchema, RegisterSchema, State } from "@/schemas";
import bcrypt from 'bcryptjs'
import { db } from "./db";
import { getUserByEmail } from "@/data/user";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";


export async function login(prevState: String|undefined, formData: FormData) {
    const validatedFields  = LoginSchema.safeParse({
        email: formData.get('email'),
        password: formData.get('password'),
    });

    if(!validatedFields.success){
        return "Invalid fields!";
    }
    
    const { email, password } = validatedFields.data;
    try {
        await signIn("credentials", {
            email,
            password,
            redirectTo: DEFAULT_LOGIN_REDIRECT
        })
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return 'Invalid credentials.';
                default:
                    return 'Something went wrong.';
            }
        }
        throw error;
    }
}

export async function register(prevState: State, formData: FormData) {
    const validatedFields  = RegisterSchema.safeParse({
        email: formData.get('email'),
        password: formData.get('password'),
        name: formData.get('name')
    });
    if(!validatedFields.success){
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Registration failed'
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
            message: 'Registration failed'
        };
    }

    await db.user.create({
        data:{
            name,
            email,
            password: hashedPassword
        },
    })

    return {
        message: 'Email sent!'
    };
}