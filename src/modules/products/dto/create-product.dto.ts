import { IsDecimal, IsNotEmpty, IsNumber, IsOptional, IsString, IsUrl, ValidateNested } from 'class-validator';
import { Additional } from 'src/modules/additionals/entities/additional.entity';
import { Category } from 'src/modules/categories/entities/category.entity';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsDecimal()
  price: number;

  @IsString()
  description: string;

  @IsNumber()
  category: Category;

  @IsOptional()
  @IsUrl()
  image_url?: string;

  @ValidateNested({ each: true })
  additionals: Additional[];
}