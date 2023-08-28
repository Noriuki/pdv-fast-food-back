import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { AdditionalsService } from 'src/modules/additionals/additionals.service';
import { CategoriesService } from 'src/modules/categories/categories.service';
import { CreateProductDto } from 'src/modules/products/dto/create-product.dto';
import { ProductsService } from 'src/modules/products/products.service';

@Injectable()
export class SeedService implements OnApplicationBootstrap {
  constructor(
    private readonly categoriesService: CategoriesService,
    private readonly additionalsService: AdditionalsService,
    private readonly productsService: ProductsService
  ) { }

  async onApplicationBootstrap() {
    const logger = new Logger('Seeding');
    logger.log('--- Seed Service: Check ---');
    const categories = await this.categoriesSeeder();
    const additionals = await this.additionalsSeeder();
    await this.productsSeeder(categories, additionals);
    logger.log('--- Seed Service: End ---');
  }

  async categoriesSeeder() {
    const find = await this.categoriesService.findAll();
    if (find.length > 0) return;
    const categoriesList = [
      { name: 'Lanches', image_url: 'https://swiftbr.vteximg.com.br/arquivos/subcategoria-hamburguer-snacks.png' },
      { name: 'Porções', image_url: 'https://s3-sa-east-1.amazonaws.com/deliveryon-uploads/products/armazemimperial/46_5ed51096799d8.png' },
      { name: 'Bebidas', image_url: 'https://giassi.vtexassets.com/arquivos/ids/644027/Refrigerante-Coca-Cola-Lata-350ml.png?v=638211558871470000' },
      { name: 'Sobremesas', image_url: 'https://www.tortamania.com.br/files/product/image/101/xvga_torta-mania-integral-torta-integral-de-maca.png' },
    ];

    const createdCategories = [];

    for (const category of categoriesList) {
      const createdCategory = await this.categoriesService.create(category);
      createdCategories.push(createdCategory);
    }

    return createdCategories;
  }

  async additionalsSeeder() {
    const find = await this.additionalsService.findAll();
    if (find.length > 0) return;
    const additionals = [
      { name: 'Queijo', price: 1.00, image_url: 'https://ederepente50.files.wordpress.com/2019/09/muzarela-fatiada-queijo-fatias.png?w=604&h=270&crop=1' },
      { name: 'Bacon', price: 1.50, image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Made20bacon.png/640px-Made20bacon.png' },
    ];

    const createdAdditionals = [];

    for (const additional of additionals) {
      const createdAdditional = await this.additionalsService.create(additional);
      createdAdditionals.push(createdAdditional);
    }

    return createdAdditionals;
  }

  async productsSeeder(categories: any[], additionals: any[]) {
    const find = await this.productsService.findAll();
    if (find.length > 0) return;
    const products: CreateProductDto[] = [
      {
        name: 'Smash da casa',
        price: 28.50,
        image_url: 'https://swiftbr.vteximg.com.br/arquivos/subcategoria-hamburguer-snacks.png',
        category: categories[0],
        description: 'Pão, carne, queijo, alface, tomate',
        additionals: [...additionals]
      },
      {
        name: 'X-Tudo Artesanal',
        price: 33.00,
        image_url: 'https://swiftbr.vteximg.com.br/arquivos/subcategoria-hamburguer-snacks.png',
        category: categories[0],
        description: 'Pão, carne, queijo, alface, tomate, bacon, ovo',
        additionals: [...additionals]
      },
      {
        name: 'Hamburguer Clássico',
        price: 45.75,
        image_url: 'https://swiftbr.vteximg.com.br/arquivos/subcategoria-hamburguer-snacks.png',
        category: categories[0],
        description: 'Pão, carne, queijo, alface, tomate',
        additionals: [...additionals]
      },
      {
        name: 'Hamburguer Vegetariano',
        price: 27.80,
        image_url: 'https://swiftbr.vteximg.com.br/arquivos/subcategoria-hamburguer-snacks.png',
        category: categories[0],
        description: 'Pão, hambúrguer de vegetais, queijo, alface, tomate',
        additionals: [...additionals]
      },
      {
        name: 'Hamburguer de Frango',
        price: 30.25,
        image_url: 'https://swiftbr.vteximg.com.br/arquivos/subcategoria-hamburguer-snacks.png',
        category: categories[0],
        description: 'Pão, hambúrguer de frango, queijo, alface, tomate',
        additionals: [...additionals]
      },
      {
        name: 'X-Salada',
        price: 35.40,
        image_url: 'https://swiftbr.vteximg.com.br/arquivos/subcategoria-hamburguer-snacks.png',
        category: categories[0],
        description: 'Pão, carne, queijo, alface, tomate',
        additionals: [...additionals]
      },
      {
        name: 'Hamburguer BBQ',
        price: 39.90,
        image_url: 'https://swiftbr.vteximg.com.br/arquivos/subcategoria-hamburguer-snacks.png',
        category: categories[0],
        description: 'Pão, carne, queijo, alface, tomate, molho BBQ',
        additionals: [...additionals]
      },
      {
        name: 'Hamburguer Cheddar',
        price: 41.20,
        image_url: 'https://swiftbr.vteximg.com.br/arquivos/subcategoria-hamburguer-snacks.png',
        category: categories[0],
        description: 'Pão, carne, queijo cheddar, alface, tomate',
        additionals: [...additionals]
      },
      {
        name: 'Hamburguer Duplo',
        price: 50.00,
        image_url: 'https://swiftbr.vteximg.com.br/arquivos/subcategoria-hamburguer-snacks.png',
        category: categories[0],
        description: 'Dois hambúrgueres, queijo, alface, tomate',
        additionals: [...additionals]
      },
      {
        name: 'Veggie Delight',
        price: 26.50,
        image_url: 'https://swiftbr.vteximg.com.br/arquivos/subcategoria-hamburguer-snacks.png',
        category: categories[0],
        description: 'Pão, hambúrguer de vegetais, queijo, alface, tomate, cebola roxa',
        additionals: [...additionals]
      },
      {
        name: 'Frango com Cream Cheese',
        price: 29.75,
        image_url: 'https://swiftbr.vteximg.com.br/arquivos/subcategoria-hamburguer-snacks.png',
        category: categories[0],
        description: 'Pão, hambúrguer de frango, cream cheese, alface, tomate',
        additionals: [...additionals]
      },
      {
        name: 'Cheddar Bacon Explosion',
        price: 37.90,
        image_url: 'https://swiftbr.vteximg.com.br/arquivos/subcategoria-hamburguer-snacks.png',
        category: categories[0],
        description: 'Pão, carne, queijo cheddar, bacon, alface, tomate, cebola caramelizada',
        additionals: [...additionals]
      }
    ];

    products.forEach(async product => {
      await this.productsService.create(product);
    });
  }
}