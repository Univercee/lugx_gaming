"use server"
import { db } from "@/lib/db";
import { Tag } from "@prisma/client";

export async function getTags(): Promise<Tag[]>{
    try {
        const tags = await db.tag.findMany({
            orderBy: {
                name:"asc"
            }
        });
      
        return tags;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch GenreByName.');
    }
  }
  
export async function getTagByName(tagName: string): Promise<Tag|null>{
    try {
        const tag = await db.tag.findFirst({
            where: {
                name: tagName
            },
            orderBy: {
                name:"asc"
            }
        });
        
        return tag;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch GenresByTag.');
    }
}