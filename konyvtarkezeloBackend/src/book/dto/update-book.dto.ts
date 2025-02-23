import { IsBoolean, IsNotEmpty, IsNumber, IsString, Max, IsUrl, IsOptional } from 'class-validator';

export class UpdateBookDto {

    @IsString()
    @IsNotEmpty()
    author?: string;
  
    @IsString()
    @IsNotEmpty()
    title?: string;
  
    @IsNumber()
    @IsNotEmpty()
    @Max(new Date().getFullYear())
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

    @IsOptional()
    @IsUrl()
    imageUrl?: string;
}
