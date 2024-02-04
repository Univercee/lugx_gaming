import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import { PrismaAdapter } from '@auth/prisma-adapter'
import { db } from '@/lib/db';
import { getUserById } from './data/user';
import { getTwoFactorConfirmationByUserId } from './data/two-factor-confirmation';


export const { 
    handlers: {GET, POST}, auth, signIn, signOut } = NextAuth({
    ...authConfig,
    adapter: PrismaAdapter(db),
    session: { strategy: "jwt" },
    pages:{
        error: "/auth/error",
        signIn: "/auth/login"
    },
    events:{
        async linkAccount({user}){
            await db.user.update({
                where: {id: user.id},
                data:{
                    emailVerified: new Date()
                }
            });
        }
    },
    callbacks: {
        async signIn({user, account}){
            console.log(user, account);
            
            if(account?.provider !== "credentials") return true;
            const existingUser = await getUserById(user.id||"");
            if(!existingUser || !existingUser.emailVerified) return false;
            if(existingUser.isTwoFactorEnabled){
                const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id);
                if(!twoFactorConfirmation) return false;
                await db.twoFactorConfirmation.delete({
                    where:{ id: twoFactorConfirmation.id}
                })
            }
            return true;
        },
        async session({session, token}){
            if(session.user && token.sub){
                session.user.id = token.sub;
            }
            if(token.role && session.user){
                session.user.role = token.role;
            }
            return session;
        },
        async jwt({token, user}) {
            if(!token.sub) return token;
            const existingUser = await getUserById(token.sub);
            if(!existingUser) return token;
            token.role = existingUser.role;
            return token;
        },
    }
});