import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { PAYMENT_METHOD } from '../../../enums/payment-method.enum';
import { Status } from '../../../enums/status.enum';
import { OrderItem } from './order-item.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: PAYMENT_METHOD,
  })
  payment_method: PAYMENT_METHOD;

  @Column({
    type: 'enum',
    enum: Status,
    default: 'pending',
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

  @OneToMany(() => OrderItem, orderItem => orderItem.order, {
    cascade: true,
    eager: true,
  })
  items: OrderItem[];
}
