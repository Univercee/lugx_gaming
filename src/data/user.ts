"use server"
import { db } from "@/lib/db";
import { User } from "@prisma/client";

export async function getUserByEmail(email: string): Promise<User|null>{
    try {
        const user = await db.user.findUnique({
            where: { 
                email: email
            }
        });
        
        return user;
    } catch (error) {
        return null;
    }
}

export async function getUserById(id: string): Promise<User|null>{
    try {
        const user = await db.user.findUnique({
            where: { id: id }
        });
        return user;
    } catch (error) {
        return null;
    }
}