"use server"
import { db } from "@/lib/db";
import { FilterParams, GameWithRelations } from "@/lib/definitions";

export async function getFilteredGames(params: FilterParams): Promise<GameWithRelations[]>{
    const genre = params.genre??undefined;
    const tag = params.tag??undefined;
    
    try {
        if(tag){
            return db.game.findMany({
                where:{
                    genres:{
                        some:{
                            name: genre
                        }
                    },
                    AND:{
                        tags:{
                            some:{
                                name: tag
                            }
                        }
                    }
                },
                include:{
                    tags: {
                        orderBy: {
                            name: 'asc'
                        }
                    },
                    genres: {
                        orderBy: {
                            name: 'asc'
                        }
                    }
                },
                orderBy: {
                    name:"asc"
                }
            })
        }
        else{
            return db.game.findMany({
                where:{
                    genres:{
                        some:{
                                name: genre
                        }
                    }
                },
                include:{
                    tags: {
                        orderBy: {
                             name: 'asc'
                        }
                    },
                    genres: {
                        orderBy: {
                            name: 'asc'
                        }
                    }
                },
                orderBy: {
                    name:"asc"
                }
            })
        }
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch GamesByFilter.');
    }
  }
  
export async function getGameById(id: string): Promise<GameWithRelations|null>{
    try {
      
      try {
        const game = await db.game.findFirst({
            where:{
                id: id
            },
            include:{
                tags: {
                    orderBy: {
                        name: 'asc'
                    }
                },
                genres: {
                    orderBy: {
                        name: 'asc'
                    }
                }
            },
            orderBy: {
                name:"asc"
            }
        });
        
        return game;
      } catch (error) {
          console.error('Database Error:', error);
          throw new Error('Failed to fetch GamesById.');
      }
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch GameById.');
    }
}

export async function getGamesByUserId(userId: string): Promise<GameWithRelations[]>{
    try {
        const games = await db.game.findMany({
            where:{
                userId
            },
            include:{
                tags: {
                    orderBy: {
                        name: 'asc'
                    }
                },
                genres: {
                    orderBy: {
                         name: 'asc'
                    }
                }
            },
            orderBy: {
                name:"asc"
            }
        });
        
        return games;
      } catch (error) {
          console.error('Database Error:', error);
          throw new Error('Failed to fetch GamesById.');
      }
}