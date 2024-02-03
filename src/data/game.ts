"use server"
import { db } from "@/lib/db";
import { FilterParams, GameWithRelations } from "@/lib/definitions";

export async function getFilteredGames(params: FilterParams): Promise<GameWithRelations[]>{
    const genre = params.genre;
    const tag = params.tag;
    
    try {
        if(tag){
            return db.game.findMany({
                where:{
                    genres:{
                        some:{
                            genre: {
                                name: genre
                            },
                        }
                    },
                    AND:{
                        tags:{
                            some:{
                                tag: {
                                    name: tag
                                }
                            }
                        }
                    }
                },
                include:{
                    tags: {
                        select: {
                            tag: true
                        },
                        orderBy: {
                            tag: {
                                name: 'asc'
                            }
                        }
                    },
                    genres: {
                        select: {
                            genre: true
                        },
                        orderBy: {
                            genre: {
                                name: 'asc'
                            }
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
                            genre: {
                                name: genre
                            },
                        }
                    }
                },
                include:{
                    tags: {
                        select: {
                            tag: true
                        },
                        orderBy: {
                            tag: {
                                name: 'asc'
                            }
                        }
                    },
                    genres: {
                        select: {
                            genre: true
                        },
                        orderBy: {
                            genre: {
                                name: 'asc'
                            }
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
                    select: {
                        tag:true
                    },
                    orderBy: {
                        tag: {
                            name: 'asc'
                        }
                    }
                },
                genres: {
                    select: {
                        genre: true
                    },
                    orderBy: {
                        genre: {
                            name: 'asc'
                        }
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