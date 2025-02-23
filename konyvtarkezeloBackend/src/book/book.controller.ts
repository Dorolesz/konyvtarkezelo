import { Controller, Get, Post, Patch, Delete, Body, Param, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { BooksService } from './book.service';
import { Book as BookModel } from '@prisma/client';
import { CreateBookDto } from './dto/create-book.dto';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  async getBooks(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('sort') sort: string = 'title',
    @Query('order') order: 'asc' | 'desc' = 'asc',
  ): Promise<{ books: BookModel[], total: number }> {
    const books = await this.booksService.getBooks({
      skip: (page - 1) * limit,
      take: limit,
      orderBy: {
        [sort]: order,
      },
    });
    const total = await this.booksService.countBooks();
    return { books, total };
  }

  @Get(':id')
  async getBookById(@Param('id') id: string): Promise<BookModel> {
    return this.booksService.getBookById({ id: Number(id) });
  }

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async createBook(@Body() createBookDto: CreateBookDto): Promise<BookModel> {
    return this.booksService.createBook(createBookDto);
  }

  @Patch(':id')
  async updateBook(
    @Param('id') id: string,
    @Body() bookData: { author?: string; title?: string; year?: number; genre?: string; pages?: number; available?: boolean; imageUrl?: string },
  ): Promise<BookModel> {
    return this.booksService.updateBook({
      where: { id: Number(id) },
      data: bookData,
    });
  }

  @Delete(':id')
  async deleteBook(@Param('id') id: string): Promise<BookModel> {
    return this.booksService.deleteBook({ id: Number(id) });
  }
}