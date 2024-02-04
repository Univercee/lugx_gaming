"use server"
import { getUserByEmail } from "@/data/user";
import { getVerificationTokenByToken } from "@/data/verification-token";
import { State } from "@/schemas";
import { db } from "../db";

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