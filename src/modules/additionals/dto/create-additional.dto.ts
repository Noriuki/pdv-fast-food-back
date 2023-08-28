import { IsDecimal, IsNotEmpty, IsOptional, IsString, IsUrl } from 'class-validator';

export class CreateAdditionalDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsDecimal()
  price: number;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsUrl()
  image_url?: string;
}