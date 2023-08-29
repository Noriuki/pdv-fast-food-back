import { IsEnum, IsNotEmpty } from 'class-validator';
import { Status } from '../../../enums/status.enum';

export class UpdateOrderDto {
  @IsNotEmpty()
  @IsEnum(Status)
  status: Status;
}
