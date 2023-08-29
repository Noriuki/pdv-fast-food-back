import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from '../ormconfig';
import { CategoriesModule } from './modules/categories/categories.module';
import { OrdersModule } from './modules/orders/orders.module';
import { ProductsModule } from './modules/products/products.module';
import { SeederModule } from './seeds/seeder.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(config),
    CategoriesModule,
    ProductsModule,
    OrdersModule,
    SeederModule,
  ],
})
export class AppModule {}
