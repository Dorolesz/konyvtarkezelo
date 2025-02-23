import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';
import process from 'process';

const prisma = new PrismaClient();

async function main() {
  const books = Array.from({ length: 30 }, () => ({
    author: faker.name.fullName(),
    title: faker.lorem.words(3),
    year: faker.date.past({ years: 30 }).getFullYear(), // Generáljunk egy véletlenszerű évet az elmúlt 30 évből
    genre: faker.music.genre(),
    pages: faker.number.int({ min: 100, max: 1000 }),
    available: faker.datatype.boolean(),
    imageUrl: 'https://storage.googleapis.com/pod_public/1300/138617.jpg', // Használjuk az imageUrl mezőt
  }));

  for (const book of books) {
    await prisma.book.create({
      data: book,
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });