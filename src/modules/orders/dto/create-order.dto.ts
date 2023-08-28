import { IsArray, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Payment_Method } from '../../../enums/payment-method.enum';
import { OrderItemDto } from './create-order-item.dto';

export class CreateOrderDto {
  @IsNotEmpty()
  @IsEnum(Payment_Method)
  payment_method: Payment_Method;

  @IsString()
  customer_name: string;

  @IsOptional()
  @IsString()
  observation?: string;

  @IsArray()
  items: OrderItemDto[];
}