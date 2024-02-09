import { PrismaClient } from '@prisma/client';
import { users, games, genres, tags } from '../src/lib/placeholderdata.ts';
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

async function seedTags() {
  tags.forEach(async (tag)=>{
    await prisma.tag.upsert({
      where: {
        id: tag.id
      },
      update:{},
      create:tag
    })
  });
};

async function seedGenres() {
  genres.forEach(async (genre)=>{
    await prisma.genre.upsert({
      where: {
        id: genre.id
      },
      update: {},
      create: {
        id: genre.id,
        name: genre.name,
        image: genre.image,
        tags: {
          connect: genre.tags.map((tag=>({id:tag.id})))
        }
      }
    })
  });
};

async function seedGames() {
  games.forEach(async (game)=>{
    await prisma.game.upsert({
      where: {
        id: game.id
      },
      update:{},
      create: {
        id: game.id,
        name: game.name,
        description: game.description,
        price: game.price,
        image: game.image,
        isActive: game.isActive,
        genres: {
          connect: game.genres.map(genre=>({id: genre.id}))
        },
        tags: {
          connect: game.tags.map(tag=>({id: tag.id}))
        },
        createdBy: {
          connect: {
            id: game.userId
          }
        }
      }
    })
  });
};

async function main() {

  await seedUsers();
  await seedTags();
  await seedGenres();
  await seedGames();
};


main()
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });