"use server"
import { auth } from "@/auth";
import { getGameById } from "@/data/game";
import { db } from "@/lib/db";
import { State } from "../definitions";
import { GameCreateSchema, GameUpdateSchema, UpdateGameIsActiveSchema } from "@/schemas";
import { GameStatus } from "@prisma/client";
import { uploadImage } from "./images";

export async function deleteGame(prevState: State, formData: FormData): Promise<State>{
    const session = await auth();
    const user = session?.user;
    
    const id = formData.get("id");
    if(!id || typeof id !== "string"){
        return {error: "Game not found!"};
    }
    
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

export async function updateGame(prevState: State, data: FormData): Promise<State>{
    const session = await auth();
    const user = session?.user;
    if(!user){
        return {error: "Unauthorized"}; 
    }
    
    const id = data.get("id");
    if(!id || typeof id !== 'string'){
        return {error: "Game not found!"};
    }

    const game = await getGameById(id);
    if(!game){
        return {error: "Game not found!"};
    }
    if(game.userId !== user.id){
        return {error: "Unauthorized"};
    }
    
    const validatedFields = GameUpdateSchema.safeParse({
        id: data.get("id"),
        name: data.get("name"),
        price: data.get("price"),
        description: data.get("description"),
        image: data.get("image"),
        genresId: data.getAll("genresId"),
        tagsId: data.getAll("tagsId")
    });
    if(!validatedFields.success){
        return {
            error: "Invalid fields!",
            errors: validatedFields.error.flatten().fieldErrors
        }
    }
    
    const fields = validatedFields.data;
    
    try {    
        const image = await uploadImage(id, fields.image);
        await db.game.update({
            where:{
                id: id
            },
            data: {
                name: fields.name,
                description: fields.description,
                image: image,
                price: fields.price,
                status: GameStatus.PENDING,
                genres: {
                    set: fields.genresId.map(id=>({id: id}))
                },
                tags: {
                    set: fields.tagsId.map(id=>({id: id}))
                }
            }
        })
        return {message: "Game updated!"};
    } catch (error) {
        console.log(error);
        
        return {error:'Something went wrong.'};
    }
}

export async function createGame(prevState: State, data: FormData): Promise<State>{
    const session = await auth();
    const user = session?.user;
    if(!user){return {error: "Unauthorized"} }
    
    const validatedFields = GameCreateSchema.safeParse({
        name: data.get("name"),
        price: data.get("price"),
        description: data.get("description"),
        image: data.get("image"),
        genresId: data.getAll("genresId"),
        tagsId: data.getAll("tagsId")
    });
    
    if(!validatedFields.success){
        return {
            error: "Invalid fields!",
            errors: validatedFields.error.flatten().fieldErrors
        }
    }
    const fields = validatedFields.data;  
    
    try {
        await db.game.create({
            data: {
                name: fields.name,
                price: fields.price,
                description: fields.description,
                image: fields.image.name,
                genres: {
                    connect: [...fields.genresId.map(id=>({id}))]
                },
                tags: {
                    connect: [...fields.tagsId.map(id=>({id}))]
                },
                isActive: true,
                userId: user.id,
                
            }
        })
        return {message: "Game created!"};
    } catch (error) {
        return {error:'Something went wrong.'};
    }
}

export async function setGameIsActive(prevState: State, data: FormData): Promise<State>{
    const session = await auth();
    const user = session?.user;
    if(!user) return { error: "Unauthorized" }

    const validatedFields = UpdateGameIsActiveSchema.safeParse({
        id: data.get("id"),
        isActive: data.get("isActive")
    });
    
    if(!validatedFields.success){
        return {
            error: "Invalid fields!",
            errors: validatedFields.error.flatten().fieldErrors
        }
    }
    const fields = validatedFields.data;  
    
    try {
        await db.game.update({
            where:{
                id: fields.id
            },
            data: {
                isActive: fields.isActive
            }
        })
        return {message: "Game updated!"};
    } catch (error) {
        return {error:'Something went wrong.'};
    }
}