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
                            genre: {
                                name: genre
                            }
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

export async function getGamesByUserId(userId: string): Promise<GameWithRelations[]>{
    try {
        const games = await db.game.findMany({
            where:{
                userId
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
        
        return games;
      } catch (error) {
          console.error('Database Error:', error);
          throw new Error('Failed to fetch GamesById.');
      }
}