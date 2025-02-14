import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class BookService {
  async getAllBooks() {
    return prisma.book.findMany();
  }

  async getBookById(id: string) {
    return prisma.book.findUnique({ where: { id: Number(id) } });
  }

  async deleteBook(id: string) {
    return prisma.book.delete({ where: { id: Number(id) } });
  }

  // Add other methods as needed
}
