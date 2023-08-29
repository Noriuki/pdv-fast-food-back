import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Additional } from '../../additionals/entities/additional.entity';
import { Product } from './product.entity';

@Entity()
export class ProductAdditional {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  product_id: number;

  @Column()
  additional_id: number;

  @ManyToOne(() => Product, product => product.additionals)
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @ManyToOne(() => Additional)
  @JoinColumn({ name: 'additional_id' })
  additional: Additional;
}
