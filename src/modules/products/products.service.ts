import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Equal,
  FindManyOptions,
  FindOptionsWhere,
  Like,
  Repository,
} from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';

import { UpdateProductDto } from './dto/update-product.dto';
import { ProductAdditional } from './entities/product-additional.entity';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(ProductAdditional)
    private readonly productAdditionalRepository: Repository<ProductAdditional>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const { additionals, ...createProduct } = createProductDto;
    const product = await this.productRepository.save(createProduct);

    if (additionals && additionals.length > 0) {
      await this.productAdditionalRepository.delete({ product_id: product.id });

      additionals.map(async additional => {
        await this.productAdditionalRepository.save({
          additional,
          product,
        });
      });
    }

    return product;
  }

  async findAll(options?: FindOptionsWhere<Product>): Promise<Product[]> {
    const queryOptions: FindManyOptions<Product> = {};

    if (options?.name) {
      queryOptions.where = { name: Like(`%${options?.name}%`) };
    }

    if (options?.category) {
      queryOptions.where = { category: { name: Equal(options?.category) } };
    }

    if (options?.code) {
      queryOptions.where = { code: Like(`%${options?.code}%`) };
    }

    queryOptions.relations = ['additionals', 'additionals.additional'];

    return await this.productRepository.find(queryOptions);
  }

  async findOne(id: number): Promise<Product> {
    const product = await this.productRepository.findOneBy({ id });
    if (!product) return null;
    return product;
  }

  async update(
    id: number,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const existingProduct = await this.productRepository.findOneBy({ id });

    if (!existingProduct) return null;

    const { additionals, ...updateProduct } = updateProductDto;

    Object.assign(existingProduct, updateProduct);
    const product = await this.productRepository.save(existingProduct);

    if (additionals && additionals.length > 0) {
      await this.productAdditionalRepository.delete({
        product_id: existingProduct.id,
      });

      additionals.map(async additional => {
        await this.productAdditionalRepository.save(additional);
      });
    }

    return product;
  }

  async remove(id: number) {
    const product = await this.productRepository.findOneBy({ id });

    if (!product) return null;

    return await this.productRepository.remove(product);
  }
}
