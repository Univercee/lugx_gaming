"use server"
import { auth } from "@/auth";
import { getGameById } from "@/data/game";
import { db } from "@/lib/db";
import { State } from "../definitions";
import { GameUpdateSchema } from "@/schemas";

export async function deleteGame(prevState: State, id: string){
    const session = await auth();
    const user = session?.user;

    const game = await getGameById(id);
    if(!game){
        return {error: "Game not found!"};
    }
    if(game.userId !== user.id){
        return {error: "Unauthorized"};
    }
    
    try {
        await db.game.delete({
            where:{
                id: game.id
            }
        })
        return {message: "Game deleted"};
    } catch (error) {
        return {error:'Something went wrong.'};
    }
}

export async function updateGame(prevState: State, data: FormData){
    const session = await auth();
    const user = session?.user;

    const validatedFields = GameUpdateSchema.safeParse(data);
    if(!validatedFields.success){
        return {
            error: "Invalid fields!",
            errors: validatedFields.error.flatten().fieldErrors
        }
    }
    const fields = validatedFields.data;

    const game = await getGameById(fields.id);
    if(!game){
        return {error: "Game not found!"};
    }
    if(game.userId !== user.id){
        return {error: "Unauthorized"};
    }
    
    
    try {
        await db.game.update({
            where:{
                id: game.id
            },
            data: {
                name: fields.name,
                description: fields.description,
                image: fields.image,
                genres: {
                    disconnect: [...fields.genresId.map(id=>({id}))]
                }
            }
        })
        return {message: "Game deleted"};
    } catch (error) {
        return {error:'Something went wrong.'};
    }
}