''
import { sql } from "@vercel/postgres";
import { FilterParams, Game, Genre, Tag } from "./definitions";

export async function getGenres(): Promise<Genre[]>{
  try {
    const data = await sql<Genre>`SELECT * FROM genres`;
    const genres = data.rows.map(genre=>(genre));
    return genres;
  } catch (error) {
      console.error('Database Error:', error);
      throw new Error('Failed to fetch Genres.');
  }
}

export async function getGenreByName(name: string|null|undefined): Promise<Genre|null>{
  try {
    const data = await sql<Genre>`SELECT * FROM genres WHERE name=${name}`;
    const genres = data.rows.map(genre=>(genre));
    
    return genres[0]??null;
  } catch (error) {
      console.error('Database Error:', error);
      throw new Error('Failed to fetch GenreByName.');
  }
}

export async function getGenresByTag(tag: string): Promise<Genre[]>{
  try {
    const data = await sql<Genre>`SELECT genres.* FROM genres
    LEFT JOIN genres_tags ON genres_tags.genre_id = genres.id
    LEFT JOIN tags ON genres_tags.tag_id = tags.id
    WHERE tags.name=${tag}`;
    const genres = data.rows.map(genre=>(genre));
    
    return genres;
  } catch (error) {
      console.error('Database Error:', error);
      throw new Error('Failed to fetch GenresByTag.');
  }
}

export async function getTags(): Promise<Tag[]>{
  try {
    const data = await sql<Tag>`SELECT * FROM tags`;
    const tags = data.rows.map(tag=>(tag));
    return tags;
  } catch (error) {
      console.error('Database Error:', error);
      throw new Error('Failed to fetch Tags.');
  }
}


export async function getTagByName(name: string|null|undefined): Promise<Tag|null>{
  try {
    const data = await sql<Tag>`SELECT * FROM tags WHERE name=${name}`;
    const tag = data.rows.map(tag=>(tag));
    
    return tag[0]??null;
  } catch (error) {
      console.error('Database Error:', error);
      throw new Error('Failed to fetch TagByName.');
  }
}

export async function getFilteredGames(params: FilterParams): Promise<Game[]>{
  const genre = params.genre;
  const tag = params.tag;
  
  try {
    const data = await sql<Game>`SELECT games.*, array_agg(DISTINCT genres.name) as genres, array_agg(DISTINCT tags.name) AS tags FROM games
      LEFT JOIN games_genres ON games_genres.game_id = games.id
      LEFT JOIN genres ON games_genres.genre_id = genres.id
      LEFT JOIN games_tags ON games_tags.game_id = games.id
      LEFT JOIN tags ON games_tags.tag_id = tags.id
      WHERE
        CASE
          WHEN ${genre}!='null'
          THEN genres.name = ${genre}
          ELSE true
        END
      AND
        CASE 
          WHEN ${tag}!='null'
          THEN tags.name = ${tag}
          ELSE true
        END
      GROUP BY games.id
      `;
    const games = data.rows.map(genre=>(genre));
    
    return games??null;
  } catch (error) {
      console.error('Database Error:', error);
      throw new Error('Failed to fetch GamesByFilter.');
  }
}

export async function getGameById(id: string): Promise<Game|null>{
  try {
    
    try {
      const data = await sql<Game>`SELECT games.*, array_agg(DISTINCT genres.name) as genres, array_agg(DISTINCT tags.name) AS tags FROM games
        LEFT JOIN games_genres ON games_genres.game_id = games.id
        LEFT JOIN genres ON games_genres.genre_id = genres.id
        LEFT JOIN games_tags ON games_tags.game_id = games.id
        LEFT JOIN tags ON games_tags.tag_id = tags.id
        WHERE games.id = ${id} 
        GROUP BY games.id
        `;
      const games = data.rows.map(genre=>(genre));
      
      return games[0]??null;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch GamesByFilter.');
    }
  } catch (error) {
      console.error('Database Error:', error);
      throw new Error('Failed to fetch GameById.');
  }
}