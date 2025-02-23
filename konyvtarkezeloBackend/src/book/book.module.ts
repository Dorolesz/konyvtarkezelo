import { Module } from '@nestjs/common';
import { BooksService } from './book.service';
import { BooksController } from './book.controller';
import { PrismaModule } from '../../prisma/prisma.module';


@Module({
  imports: [PrismaModule],
  controllers: [BooksController],
  providers: [BooksService],
})
export class BookModule {}
