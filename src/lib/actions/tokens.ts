import { getVerificationTokenByEmail } from "@/data/verification-token";
import { PasswordResetToken, VerificationToken } from "@prisma/client";
import { randomUUID } from "crypto";
import { db } from "../db";
import { getPasswordResetTokenByEmail } from "@/data/password-resest-token";

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