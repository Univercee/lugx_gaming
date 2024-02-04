import { getUserByEmail } from "@/data/user";
import { getVerificationTokenByToken } from "@/data/verification-token";
import { State } from "@/schemas";
import { Resend } from "resend";
import { db } from "../db";

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