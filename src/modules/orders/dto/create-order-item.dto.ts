import { IsDecimal, IsJSON, IsNumber, IsOptional } from 'class-validator';
import { Additional } from 'src/modules/additionals/entities/additional.entity';

export class OrderItemDto {
  @IsNumber()
  product_id: number;

  @IsDecimal()
  base_amount: number;

  @IsNumber()
  quantity: number;

  @IsJSON()
  @IsOptional()
  additionals: {
    id?: number;
    product_id: number;
    additional_id: number;
    additional: Additional;
  };
}
