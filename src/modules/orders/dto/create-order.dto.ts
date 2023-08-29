import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { PAYMENT_METHOD } from '../../../enums/payment-method.enum';
import { OrderItemDto } from './create-order-item.dto';

export class CreateOrderDto {
  @IsNotEmpty()
  @IsEnum(PAYMENT_METHOD)
  payment_method: PAYMENT_METHOD;

  @IsString()
  customer_name: string;

  @IsOptional()
  @IsString()
  observation?: string;

  @IsArray()
  items: OrderItemDto[];
}
