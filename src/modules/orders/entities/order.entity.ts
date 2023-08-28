import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Payment_Method } from '../../../enums/payment-method.enum';
import { Status } from '../../../enums/status.enum';
import { OrderItem } from './order-item.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: Payment_Method
  })
  payment_method: Payment_Method;

  @Column({
    type: 'enum',
    enum: Status,
    default: 'pending'
  })
  status: Status;

  @Column({
    type: 'varchar',
  })
  customer_name: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  observation: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  total_amount: number;

  @OneToMany(() => OrderItem, orderItem => orderItem.order, { cascade: true, eager: true })
  items: OrderItem[];
}