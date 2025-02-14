import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

const generateBooks = async (numBooks: number) => {
  for (let i = 0; i < numBooks; i++) {
    await prisma.book.create({
      data: {
        author: faker.name.fullName(),
        title: faker.lorem.words(3),
        year: faker.date.past({ years: 50 }).getFullYear(), // Generáljunk egy véletlenszerű évet az elmúlt 50 évből
        genre: faker.music.genre(),
        pages: faker.number.int({ min: 100, max: 1000 }),
        available: faker.datatype.boolean(),
      },
    });
  }
};

const main = async () => {
  console.log('Adatbázis feltöltése...');
  await generateBooks(50); // Generáljunk 50 könyvet
  console.log('Adatbázis sikeresen feltöltve.');
};

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
