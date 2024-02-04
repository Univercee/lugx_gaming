"use server"
import { Resend } from "resend";

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
export async function sendTwoFactorEmail(email: string, token: string){
    await resend.emails.send({
        from: "onboarding@resend.dev",
        to: email,
        subject: "2FA code",
        html: `<p>Your 2FA code: ${token}</p>`
    });
};