'use server'
import { FilterParams, Game, Genre, Tag } from "./definitions";
import { games, genres, tags } from "./placeholderdata"

export async function getGenres(): Promise<Genre[]>{
  return genres;
}

export async function getGenreByName(name: string|null|undefined): Promise<Genre|null>{
  if(!name) return null;
    const genre = genres.filter((genre)=>(
    genre.name == name
  ))[0];
  if(!genre) return null;
  return genre;
}

export async function getTags(): Promise<Tag[]>{
  return tags;
}
export async function getTagByName(name: string|null|undefined): Promise<Tag|null>{
  if(!name) return null;
    const tag = tags.filter((tag)=>(
    tag.name == name
  ))[0];
  if(!tag) return null;
  return tag;
}

export async function getFilteredGames(params: FilterParams): Promise<Game[]>{
  let filteredGames = games;
  
  if(params.genre){
    filteredGames = filteredGames.filter((game)=>(
      game.genres.includes(params.genre!)
    ))
    
  }
  if(params.tag){
    filteredGames = filteredGames.filter((game)=>(
      game.tags.includes(params.tag!)
    ))
  }
  return filteredGames;
}

export async function getGameById(id: string): Promise<Game|null>{
  const game = games.filter((game)=>(
    game.id == id
  ))[0];
  if(!game) return null;
  return game;
}