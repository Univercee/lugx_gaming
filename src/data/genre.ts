"use server"
import { db } from "@/lib/db";
import { GenreWithRelations } from "@/lib/definitions";

export async function getGenres(): Promise<GenreWithRelations[]>{
    try {
        const genres = await db.genre.findMany({
            include:{
                tags: {
                    select: {
                        tag:true
                    }
                }
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
                        tag: {
                            name: tagName
                        }
                    }
                }
            },
            include:{
                tags: {
                    select: {
                        tag:true
                    }
                }
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