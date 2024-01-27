const { db } = require('@vercel/postgres');

async function migrateGames(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    const createTable = await client.sql`
      DROP TABLE IF EXISTS games CASCADE;
      CREATE TABLE games (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL UNIQUE,
        description TEXT NOT NULL,
        price FLOAT NOT NULL,
        sale INT,
        image VARCHAR(255) NOT NULL
      );
    `;

    console.log(`Created "games" table`);

    return {
      createTable,
    };
  } catch (error) {
    console.error('Error migrate games:', error);
    throw error;
  }
}

async function migrateGenres(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    const createTable = await client.sql`
      DROP TABLE IF EXISTS genres CASCADE;
      CREATE TABLE genres (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      image VARCHAR(255) NOT NULL
    );
  `;

    console.log(`Created "genres" table`);

    return {
      createTable,
    };
  } catch (error) {
    console.error('Error migrate genres:', error);
    throw error;
  }
}

async function migrateTags(client) {
    try {
      await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  
      const createTable = await client.sql`
      DROP TABLE IF EXISTS tags CASCADE;
      CREATE TABLE tags (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL
    );
  `;
  
      console.log(`Created "tags" table`);
  
      return {
        createTable,
      };
    } catch (error) {
      console.error('Error migrate tags:', error);
      throw error;
    }
  }

async function migrateGamesTags(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    const createTable = await client.sql`
    DROP TABLE IF EXISTS games_tags CASCADE;
    CREATE TABLE games_tags (
      game_id UUID REFERENCES games(id),
      tag_id UUID REFERENCES tags(id),
      CONSTRAINT games_tags_pk PRIMARY KEY(game_id,tag_id)
    );
  `;

    console.log(`Created "games_tags" table`);

    return {
      createTable,
    };
  } catch (error) {
    console.error('Error migrate games_tags:', error);
    throw error;
  }
}

async function migrateGamesGenres(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    const createTable = await client.sql`
    DROP TABLE IF EXISTS games_genres CASCADE;
    CREATE TABLE games_genres (
      game_id UUID REFERENCES games(id),
      genre_id UUID REFERENCES genres(id),
      CONSTRAINT games_genres_pk PRIMARY KEY(game_id,genre_id)
    );
  `;

    console.log(`Created "games_genres" table`);

    return {
      createTable,
    };
  } catch (error) {
    console.error('Error migrate games_genres:', error);
    throw error;
  }
}

async function migrateGenresTags(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    const createTable = await client.sql`
    DROP TABLE IF EXISTS genres_tags CASCADE;
    CREATE TABLE genres_tags (
      genre_id UUID REFERENCES genres(id),
      tag_id UUID REFERENCES tags(id),
      CONSTRAINT genres_tags_pk PRIMARY KEY(genre_id,tag_id)
    );
  `;

    console.log(`Created "genres_tags" table`);

    return {
      createTable,
    };
  } catch (error) {
    console.error('Error migrate genres_tags:', error);
    throw error;
  }
}


async function main() {
  const client = await db.connect();

  await migrateGames(client);
  await migrateGenres(client);
  await migrateTags(client);
  await migrateGamesGenres(client);
  await migrateGamesTags(client);
  await migrateGenresTags(client);

  await client.end();
}

main().catch((err) => {
  console.error(
    'An error occurred while attempting to seed the database:',
    err,
  );
});

