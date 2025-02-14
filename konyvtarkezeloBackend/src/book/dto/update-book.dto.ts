import { PartialType } from '@nestjs/mapped-types';
import { CreateBookDto } from './create-book.dto';
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateBookDto extends PartialType(CreateBookDto) {

    @IsString()
    @IsNotEmpty()
    author?: string;
  
    @IsString()
    @IsNotEmpty()
    title?: string;
  
    @IsNumber()
    @IsNotEmpty()
    year?: number;
  
    @IsString()
    @IsNotEmpty()
    genre?: string;
  
    @IsNumber()
    @IsNotEmpty()
    pages?: number;
  
    @IsBoolean()
    @IsNotEmpty()
    available?: boolean;
}
