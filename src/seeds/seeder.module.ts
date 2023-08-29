import { Module } from '@nestjs/common';
import { AdditionalsModule } from 'src/modules/additionals/additionals.module';
import { CategoriesModule } from 'src/modules/categories/categories.module';
import { OrdersModule } from 'src/modules/orders/orders.module';
import { ProductsModule } from 'src/modules/products/products.module';
import { SeedService } from './seeder';
import { SeederController } from './seeder.controller';

@Module({
  imports: [AdditionalsModule, CategoriesModule, ProductsModule, OrdersModule],
  controllers: [SeederController],
  providers: [SeedService],
})
export class SeederModule {}
