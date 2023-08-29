import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { Category } from './entities/category.entity';

describe('CategoriesController', () => {
  let controller: CategoriesController;
  let service: CategoriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoriesController],
      providers: [
        {
          provide: CategoriesService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<CategoriesController>(CategoriesController);
    service = module.get<CategoriesService>(CategoriesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a category', async () => {
      // Arrange
      const categoryDto = { name: 'Sobremesas' };
      const createdCategory: Category = {
        id: 1,
        ...categoryDto,
        image_url: null,
      };

      jest.spyOn(service, 'create').mockResolvedValue(createdCategory);

      // Act
      const result = await controller.create(categoryDto);

      // Assert
      expect(result).toEqual(createdCategory);
    });
  });

  describe('findAll', () => {
    it('should return an array of categories', async () => {
      // Arrange
      const categories: Category[] = [
        { id: 1, name: 'Category1', image_url: null },
        { id: 2, name: 'Category2', image_url: null },
      ];

      jest.spyOn(service, 'findAll').mockResolvedValue(categories);

      // Act
      const result = await controller.findAll();

      // Assert
      expect(result).toEqual(categories);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a category by id', async () => {
      // Arrange
      const categoryId = 1;
      const category: Category = {
        id: categoryId,
        name: 'TestCategory',
        image_url: null,
      };

      jest.spyOn(service, 'findOne').mockResolvedValue(category);

      // Act
      const result = await controller.findOne(categoryId);

      // Assert
      expect(result).toEqual(category);
      expect(service.findOne).toHaveBeenCalledWith(categoryId);
    });
  });

  describe('update', () => {
    it('should update a category', async () => {
      // Arrange
      const categoryId = 1;
      const updatedData = { name: 'UpdatedCategory' };
      const updatedCategory: Category = {
        id: categoryId,
        ...updatedData,
        image_url: null,
      };

      jest.spyOn(service, 'update').mockResolvedValue(updatedCategory);

      // Act
      const result = await controller.update(categoryId, updatedData);

      // Assert
      expect(result).toEqual(updatedCategory);
      expect(service.update).toHaveBeenCalledWith(categoryId, updatedData);
    });
  });

  describe('remove', () => {
    it('should remove a category', async () => {
      // Arrange
      const categoryId = 1;
      const deletedCategory = { id: 1, name: 'Category1', image_url: null };

      jest.spyOn(service, 'remove').mockResolvedValue(deletedCategory);
      // Act
      const result = await controller.remove(categoryId);

      // Assert
      expect(result).toBe(deletedCategory);
      expect(service.remove).toHaveBeenCalledWith(categoryId);
    });
  });
});
