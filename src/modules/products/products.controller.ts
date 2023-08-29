import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { FindOptionsWhere } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  private readonly productsService: ProductsService;

  @Post()
  async create(@Body() createProductDto: CreateProductDto): Promise<Product> {
    const createProduct = await this.productsService.create(createProductDto);

    return createProduct;
  }

  @Get()
  findAll(@Query() query: FindOptionsWhere<Product>) {
    return this.productsService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Product> {
    return this.productsService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const updatedProduct = await this.productsService.update(
      id,
      updateProductDto,
    );

    return updatedProduct;
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.productsService.remove(id);
  }
}
