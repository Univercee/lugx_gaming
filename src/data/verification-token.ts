"use server"
import { db } from "@/lib/db";
import { VerificationToken } from "@prisma/client";

export async function getVerificationTokenByEmail(email: string): Promise<VerificationToken|null>{
    try {
        const verificationToken = await db.verificationToken.findFirst({
            where:{
                email: email
            }
        });
      
        return verificationToken;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch VerificationToken.');
    }
}

export async function getVerificationTokenByToken(token: string): Promise<VerificationToken|null>{
    try {
        const verificationToken = await db.verificationToken.findFirst({
            where:{
                token: token
            }
        });
      
        return verificationToken;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch VerificationToken.');
    }
}