"use server"
import { db } from "@/lib/db";
import { VerifiactionToken } from "@prisma/client";

export async function getVerificationTokenByEmail(email: string): Promise<VerifiactionToken|null>{
    try {
        const verifiactionToken = await db.verifiactionToken.findFirst({
            where:{
                email: email
            }
        });
      
        return verifiactionToken;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch VerifiactionToken.');
    }
}

export async function getVerificationTokenByToken(token: string): Promise<VerifiactionToken|null>{
    try {
        const verifiactionToken = await db.verifiactionToken.findFirst({
            where:{
                token: token
            }
        });
      
        return verifiactionToken;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch VerifiactionToken.');
    }
}