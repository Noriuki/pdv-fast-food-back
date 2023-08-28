import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoriesService } from './categories.service';
import { Category } from './entities/category.entity';

describe('CategoriesService', () => {
  let service: CategoriesService;
  let repo: Repository<Category>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoriesService,
        {
          provide: getRepositoryToken(Category),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<CategoriesService>(CategoriesService);
    repo = module.get<Repository<Category>>(getRepositoryToken(Category));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a category', async () => {
      const categoryDto = { name: 'TestCategory' };
      const createdCategory: Category = { id: 1, ...categoryDto, image_url: null };

      jest.spyOn(repo, 'create').mockReturnValue(createdCategory);
      jest.spyOn(repo, 'save').mockResolvedValue(createdCategory);

      const result = await service.create(categoryDto);

      expect(result).toEqual(createdCategory);
      expect(repo.create).toHaveBeenCalledWith(categoryDto);
      expect(repo.save).toHaveBeenCalledWith(createdCategory);

    });
  });

  describe('findAll', () => {
    it('should return an array of categories', async () => {
      const categories: Category[] = [
        { id: 1, name: 'Category1', image_url: null },
        { id: 2, name: 'Category2', image_url: null }
      ];

      jest.spyOn(repo, 'find').mockResolvedValue(categories);

      const result = await service.findAll();

      expect(result).toEqual(categories);
      expect(repo.find).toHaveBeenCalled();
    });
  });

  describe('findOneBy', () => {
    it('should return a category by id', async () => {
      const id = 1;
      const category: Category = { id, name: 'TestCategory', image_url: null };

      jest.spyOn(repo, 'findOneBy').mockResolvedValue(category);
      const result = await service.findOne(id);

      expect(result).toEqual(category);
      expect(repo.findOneBy).toHaveBeenCalledWith({ id });
    });

    it('should return null if category is not found', async () => {
      const id = 99;

      jest.spyOn(repo, 'findOneBy').mockResolvedValue(null)
      const result = await service.findOne(id);

      expect(result).toBeNull();
      expect(repo.findOneBy).toHaveBeenCalledWith({ id });
    });
  });

  describe('update', () => {
    it('should update a category', async () => {
      const id = 1;
      const updateDto = { name: 'UpdatedCategory' };
      const updatedCategory: Category = { id, ...updateDto, image_url: null };

      jest.spyOn(repo, 'findOneBy').mockResolvedValue(updatedCategory);
      jest.spyOn(repo, 'save').mockResolvedValue(updatedCategory);
      const result = await service.update(id, updateDto);

      expect(result).toEqual(updatedCategory);
      expect(repo.findOneBy).toHaveBeenCalledWith({ id });
      expect(repo.save).toHaveBeenCalledWith(updatedCategory);
    });

    it('should return null if category is not found', async () => {
      const id = 1;
      const updateDto = { name: 'UpdatedCategory' };
      const updatedCategory: Category = { id, ...updateDto, image_url: null };

      jest.spyOn(repo, 'findOneBy').mockResolvedValue(null);
      const result = await service.update(id, updatedCategory);

      expect(result).toBeNull();
      expect(repo.findOneBy).toHaveBeenCalledWith({ id });
    });
  });

  describe('remove', () => {
    it('should remove a category', async () => {
      const id = 1;
      const removedCategory = { id, name: 'RemovedCategory', image_url: null };

      jest.spyOn(repo, 'findOneBy').mockResolvedValue(removedCategory);
      jest.spyOn(repo, 'remove').mockResolvedValue(removedCategory);
      const result = await service.remove(id);

      expect(result).toEqual(removedCategory);
      expect(repo.findOneBy).toHaveBeenCalledWith({ id });
      expect(repo.remove).toHaveBeenCalledWith(removedCategory);
    });

    it('should return null if category is not found', async () => {
      const id = 1;

      jest.spyOn(repo, 'findOneBy').mockResolvedValue(null);
      const result = await service.remove(id);

      expect(result).toBeNull();
      expect(repo.findOneBy).toHaveBeenCalledWith({ id });
    });
  });
});