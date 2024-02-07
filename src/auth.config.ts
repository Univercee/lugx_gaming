import type { NextAuthConfig } from 'next-auth';
import credentials from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs'
import { LoginSchema } from './schemas';
import github from 'next-auth/providers/github';
import { getUserByEmail } from './data/user';
import google from 'next-auth/providers/google';

export const authConfig = {
    providers: [
        github({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
        }),
        google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        credentials({
            async authorize(credentials){
                const parsedCredentials = LoginSchema.safeParse(credentials);
                if (parsedCredentials.success) {
                    const { email, password,  } = parsedCredentials.data;
                    
                    const user = await getUserByEmail(email);
                    
                    if (!user || !user.password) return null;
                    
                    const passwordMatch = await bcrypt.compare(password, user.password);
                    if(passwordMatch) return user;
                }
                console.log('Invalid credentials');
                return null;
            }
      })
  ]
} satisfies NextAuthConfig;