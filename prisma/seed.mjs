import { PrismaClient } from '@prisma/client';
import { users, games, genres, tags, statuses } from '../src/lib/placeholderdata.mjs';
const prisma = new PrismaClient();

async function seedUsers() {
  users.forEach(async (user)=>{
    await prisma.user.upsert({
      where: {
        id: user.id
      },
      update:{},
      create:user
    })
  });
};

async function seedStatuses() {
  statuses.forEach(async (status)=>{
    await prisma.status.upsert({
      where: {
        id: status.id
      },
      update:{},
      create:{
        ...status
      }
    })
  });
};

async function seedTags() {
  tags.forEach(async (tag)=>{
    await prisma.tag.upsert({
      where: {
        id: tag.id
      },
      update:{},
      create:{
        ...tag
      }
    })
  });
};

async function seedGenres() {
  let genresCopy =JSON.parse(JSON.stringify(genres));
  genresCopy.forEach(async (genre)=>{
    const tags = genre.tags;
    delete genre.tags;
    await prisma.genre.upsert({
      where: {
        id: genre.id
      },
      update: {},
      create: {
        ...genre
      }
    })
  });
};

async function seedGames() {
  let gamesCopy = JSON.parse(JSON.stringify(games));
  gamesCopy.forEach(async (game)=>{
    const statusId = game.status.id;
    const userId = game.createdBy.id;
    const genres = game.genres;
    const tags = game.tags;
    delete game.genres;
    delete game.tags;
    delete game.status;
    delete game.createdBy;
    await prisma.game.upsert({
      where: {
        id: game.id
      },
      update:{},
      create: {
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
      await prisma.gamesOnGenres.upsert({
        where:{
          gameId_genreId:{
            gameId: game.id,
            genreId: genre.id
          }
        },
        update:{},
        create:{
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
      await prisma.gamesOnTags.upsert({
        where:{
          gameId_tagId:{
            gameId: game.id,
            tagId: tag.id
          }
        },
        update:{},
        create:{
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
      await prisma.genresOnTags.upsert({
        where:{
          genreId_tagId:{
            tagId: tag.id,
            genreId: genre.id
          }
        },
        update:{},
        create:{
          tagId: tag.id,
          genreId: genre.id
        }
      })
    })
  });
};

async function main() {

  await seedUsers();
  await prisma.$disconnect();
  await seedStatuses();
  await prisma.$disconnect();
  await seedTags();
  await prisma.$disconnect();
  await seedGenres();
  await prisma.$disconnect();
  await seedGames();
  await prisma.$disconnect();
  await seedGamesOnGenres();
  await prisma.$disconnect();
  await seedGamesOnTags();
  await prisma.$disconnect();
  await seedGenresOnTags();
  await prisma.$disconnect();
};


main()
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });