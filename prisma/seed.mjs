import { PrismaClient } from '@prisma/client';
import { users, games, genres, tags, statuses } from '../src/lib/placeholderdata.mjs';
const prisma = new PrismaClient();

async function seedUsers() {
  users.forEach(async (user)=>{
    await prisma.user.create({
      data: user
    })
  });
};

async function seedStatuses() {
  statuses.forEach(async (status)=>{
    await prisma.status.create({
      data: status
    })
  });
};

async function seedTags() {
  tags.forEach(async (tag)=>{
    await prisma.tag.create({
      data: tag
    })
  });
};

async function seedGenres() {
  genres.forEach(async (genre)=>{
    const genreTags = genre.tags||[];
    const id = genre.id;
    delete genre.tags;
    delete genre.id;
    await prisma.genre.upsert({
        where: {
          id: id
        },
        update: {
          ...genre,
          tags: {
            connect: genreTags.map((el)=>({id: el.id}))
          }
        },
        create: {
          ...genre,
          id,
          tags: {
            connect: genreTags.map((el)=>({id: el.id}))
          }
        },
        include: {
          tags: true
        }
      })
  });
};

async function seedGames() {
  games.forEach(async (game)=>{
    const gamesGenres = game.genres;
    const gamesTags = game.tags;
    const statusId = game.status.id;
    const userId = game.createdBy.id;
    delete game.genres;
    delete game.tags;
    delete game.status;
    delete game.createdBy;
    await prisma.game.create({
        data: {
          ...game,
          statusId,
          userId
        }
      })
  });
};

async function seedGamesOnGenres() {
  games.forEach(async (game)=>{
    game.genres.forEach(async (genre)=>{
      await prisma.gamesOnGenres.create({
        data:{
          gameId: game.id,
          genreId: genre.id
        }    
      })
    })
  });
};

async function seedGamesOnTags() {
  games.forEach(async (game)=>{
    game.tags.forEach(async (tag)=>{
      await prisma.gamesOnTags.create({
        data:{
          gameId: game.id,
          tagId: tag.id
        }    
      })
    })
  });
};

async function seedGenresOnTags() {
  genres.forEach(async (genre)=>{
    genre.tags.forEach(async (tag)=>{
      await prisma.genresOnTags.create({
        data:{
          tagId: tag.id,
          genreId: genre.id
        }    
      })
    })
  });
};

async function main() {

  await seedUsers();
  await seedStatuses();
  await seedTags();
  await seedGenres();
  await seedGames();
  await seedGamesOnGenres();
  await seedGamesOnTags();
  await seedGenresOnTags();

  await prisma.$disconnect();
};


main()
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });