import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrderItem } from './entities/order-item.entity';
import { Order } from './entities/order.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(OrderItem)
    private readonly orderItemRepository: Repository<OrderItem>,
  ) {}

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    const { customer_name, payment_method, observation, items } =
      createOrderDto;

    const order = await this.orderRepository.save({
      customer_name,
      payment_method,
      observation,
    });

    let order_total = 0;

    items.map(async item => {
      let total_item = Number(item.base_amount * item.quantity);

      let additional = null;
      if (item.additionals) {
        total_item += Number(item.additionals.additional.price);
        additional = JSON.stringify(item.additionals);
      }

      const savedItem = await this.orderItemRepository.save({
        order,
        ...item,
        total_amount: total_item,
        additionals: additional,
      });
      order_total += Number(savedItem.total_amount);
    });

    order.total_amount = order_total;
    await this.orderRepository.save(order);

    return order;
  }

  async findAll(): Promise<Order[]> {
    return this.orderRepository.find({ relations: ['items', 'items.product'] });
  }

  async findOne(id: number): Promise<Order> {
    const order = await this.orderRepository.findOneBy({ id });
    if (!order) return null;
    return order;
  }

  async update(id: number, updateOrderDto: UpdateOrderDto): Promise<Order> {
    const order = await this.orderRepository.findOneBy({ id });
    this.orderRepository.merge(order, updateOrderDto);
    return this.orderRepository.save(order);
  }

  async remove(id: number): Promise<void> {
    const order = await this.orderRepository.findOneBy({ id });
    await this.orderRepository.remove(order);
  }
}
