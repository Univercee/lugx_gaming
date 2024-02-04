import { getUserByEmail } from "@/data/user";
import { NewPasswordSchema, ResetPasswordSchema, State } from "@/schemas";
import { Resend } from "resend";
import { getPasswordResetTokenByToken } from "@/data/password-resest-token";
import { db } from "../db";
import bcrypt from 'bcryptjs'
import { generatePasswordResetToken } from "./tokens";

const resend = new Resend(process.env.RESENT_API_KEY);

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