import { IsBoolean, IsNotEmpty, IsNumber, IsString, IsUrl, Max } from "class-validator";
export class CreateBookDto {

  @IsString()
  @IsNotEmpty()
  author: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsNumber()
  @IsNotEmpty()
  @Max(new Date().getFullYear())
  year: number;

  @IsString()
  @IsNotEmpty()
  genre: string;

  @IsNumber()
  @IsNotEmpty()
  pages: number;

  @IsBoolean()
  @IsNotEmpty()
  available: boolean;

  @IsUrl()
  @IsNotEmpty()
  imageUrl: string;
}
