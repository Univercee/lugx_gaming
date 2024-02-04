"use server"
import { db } from "@/lib/db";
import { PasswordResetToken } from "@prisma/client";

export async function getPasswordResetTokenByEmail(email: string): Promise<PasswordResetToken|null>{
    try {
        const passwordResetToken = await db.passwordResetToken.findFirst({
            where:{
                email: email
            }
        });
      
        return passwordResetToken;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch PasswordResetToken.');
    }
}

export async function getPasswordResetTokenByToken(token: string): Promise<PasswordResetToken|null>{
    try {
        const passwordResetToken = await db.passwordResetToken.findFirst({
            where:{
                token: token
            }
        });
      
        return passwordResetToken;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch PasswordResetToken.');
    }
}