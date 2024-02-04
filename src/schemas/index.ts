import * as z from 'zod';

export type State = {
    errors?: {
        email?: string[],
        password?: string[],
        name?: string[]
    },
    message?: string | null,
    error?: string | null
};


export const LoginSchema = z.object({
    email: z.string().email({
        message: "Email is required",
    }),
    password: z.string().min(1, {
        message: "Password is required",
    })
})

export const RegisterSchema = z.object({
    email: z.string().email({
        message: "Email is required",
    }),
    password: z.string().min(6, {
        message: "Minimum 6 characters required",
    }),
    name: z.string().min(1, {
        message: "Name is required",
    })
})

export const NewPasswordSchema = z.object({
    token: z.string({
        required_error: "Token required"
    }),
    password: z.string().min(6, {
        message: "Minimum 6 characters required",
    })
})

export const ResetPasswordSchema = LoginSchema.omit({password: true});