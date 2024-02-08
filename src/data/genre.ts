"use server"
import { db } from "@/lib/db";
import { GenreWithRelations } from "@/lib/definitions";

export async function getGenres(): Promise<GenreWithRelations[]>{
    try {
        const genres = await db.genre.findMany({
            include:{
                tags: true
            },
            orderBy: {
                name:"asc"
            }
        });
      
        return genres;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch GenreByName.');
    }
}

export async function getGenresByTag(tagName: string): Promise<GenreWithRelations[]>{
    try {
        const genres = await db.genre.findMany({
            where:{
                tags:{
                    some:{
                        name: tagName
                    }
                }
            },
            include:{
                tags: true
            },
            orderBy: {
                name:"asc"
            }
        });
      
        return genres;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch GenreByName.');
    }
}