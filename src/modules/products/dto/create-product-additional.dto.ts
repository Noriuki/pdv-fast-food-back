import { IsNumber } from 'class-validator';

export class CreateProductAdditionalDto {
  @IsNumber()
  product_id: number;

  @IsNumber()
  additional_id: number;
}