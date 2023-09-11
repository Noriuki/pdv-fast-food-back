import { Module } from '@nestjs/common';
import { AdditionalsModule } from 'src/modules/additionals/additionals.module';
import { CategoriesModule } from 'src/modules/categories/categories.module';
import { OrdersModule } from 'src/modules/orders/orders.module';
import { ProductsModule } from 'src/modules/products/products.module';
import { SeedService } from './seeder';

@Module({
  imports: [AdditionalsModule, CategoriesModule, ProductsModule, OrdersModule],
  providers: [SeedService],
})
export class SeederModule {}
