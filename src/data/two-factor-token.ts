"use server"
import { db } from "@/lib/db";
import { TwoFactorToken } from "@prisma/client";

export async function getTwoFactorTokenByEmail(email: string): Promise<TwoFactorToken|null>{
    try {
        const twoFactorToken = await db.twoFactorToken.findFirst({
            where:{
                email: email
            }
        });
      
        return twoFactorToken;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch TwoFactorToken.');
    }
}

export async function getTwoFactorTokenByToken(token: string): Promise<TwoFactorToken|null>{
    try {
        const twoFactorToken = await db.twoFactorToken.findFirst({
            where:{
                token: token
            }
        });
      
        return twoFactorToken;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch TwoFactorToken.');
    }
}