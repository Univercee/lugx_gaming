import { db } from '@vercel/postgres';
import { games, tags, genres } from '../lib/placeholderdata.mjs';

// games
async function seedGames(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    const insertedGames = await Promise.all(
        games.map(async (game) => {
          return client.sql`
            INSERT INTO games (id, name, description, price, sale, image)
            VALUES (${game.id}, ${game.name}, ${game.description}, ${game.price}, ${game.sale}, ${game.image})
            ON CONFLICT (id) DO NOTHING;
          `;
        }),
    );

    console.log(`Seeded ${insertedGames.length} games`);

    return {
      insertedGames,
    };
  } catch (error) {
    console.error('Error seeding games:', error);
    throw error;
  }
}

// genres
async function seedGenres(client) {
    try {
      await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  
      const insertedGenres = await Promise.all(
          genres.map(async (genre) => {
            return client.sql`
              INSERT INTO genres (id, name, image)
              VALUES (${genre.id}, ${genre.name}, ${genre.image})
              ON CONFLICT (id) DO NOTHING;
            `;
          }),
      );
  
      console.log(`Seeded ${insertedGenres.length} genres`);
  
      return {
        insertedGenres,
      };
    } catch (error) {
      console.error('Error seeding genres:', error);
      throw error;
    }
  }

// tags
async function seedTags(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    const insertedTags = await Promise.all(
        tags.map(async (tag) => {
          return client.sql`
          INSERT INTO tags (id, name)
          VALUES (${tag.id}, ${tag.name})
          ON CONFLICT (id) DO NOTHING;
        `;
        }),
    );

    console.log(`Seeded ${insertedTags.length} tags`);

    return {
      insertedTags,
    };
  } catch (error) {
    console.error('Error seeding tags:', error);
    throw error;
  }
}

// games_genres
async function seedGamesGenres(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    const insertedGamesGenres = await Promise.all(
        games.map(async (game) => {
          return game.genres.map(async (genre)=>{
            return client.sql`
            INSERT INTO games_genres (game_id, genre_id)
              VALUES (${game.id}, ${genre.id})
              ON CONFLICT (game_id, genre_id) DO NOTHING;
            `;
          })
        }),
    );

    console.log(`Seeded ${insertedGamesGenres.length} games_genres`);

    return {
      insertedGamesGenres,
    };
  } catch (error) {
    console.error('Error seeding games_genres:', error);
    throw error;
  }
}

// games_tags
async function seedGamesTags(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    const insertedGamesTags = await Promise.all(
        games.map(async (game) => {
          return game.tags.map(async (tag)=>{
            return client.sql`
            INSERT INTO games_tags (game_id, tag_id)
              VALUES (${game.id}, ${tag.id})
              ON CONFLICT (game_id, tag_id) DO NOTHING;
            `;
          })
        }),
    );

    console.log(`Seeded ${insertedGamesTags.length} games_tags`);
    return {
      insertedGamesTags,
    };
  } catch (error) {
    console.error('Error seeding games_tags:', error);
    throw error;
  }
}

// genres_tags
async function seedGenresTags(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    const insertedGenresTags = await Promise.all(
        genres.map(async (genre) => {
          return genre.tags.map(async (tag)=>{
            return client.sql`
            INSERT INTO genres_tags (genre_id, tag_id)
              VALUES (${genre.id}, ${tag.id})
              ON CONFLICT (genre_id, tag_id) DO NOTHING;
            `;
          })
        }),
    );

    console.log(`Seeded ${insertedGenresTags.length} genres_tags`);

    return {
      insertedGenresTags,
    };
  } catch (error) {
    console.error('Error seeding genres_tags:', error);
    throw error;
  }
}


async function main() {
  const client = await db.connect();

  await seedGames(client);
  await seedGenres(client);
  await seedTags(client);
  await seedGamesTags(client);
  await seedGenresTags(client);
  await seedGamesGenres(client);
  

  await client.end();
}

main().catch((err) => {
  console.error(
    'An error occurred while attempting to seed the database:',
    err,
  );
});

