import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AdditionalsService } from './additionals.service';
import { UpdateAdditionalDto } from './dto/update-additional.dto';
import { Additional } from './entities/additional.entity';

describe('AdditionalsService', () => {
  let service: AdditionalsService;
  let repo: Repository<Additional>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AdditionalsService,
        {
          provide: getRepositoryToken(Additional),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<AdditionalsService>(AdditionalsService);
    repo = module.get<Repository<Additional>>(getRepositoryToken(Additional));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create an additional', async () => {
      const createDto = {
        name: 'Additional',
        price: 5.0,
      };
      const createdAdditional: Additional = {
        id: 1,
        ...createDto,
        description: 'lorem ipsum',
        image_url: null,
      };

      const createSpy = jest.spyOn(repo, 'create').mockReturnValue(createdAdditional);
      const saveSpy = jest.spyOn(repo, 'save').mockResolvedValue(createdAdditional);

      const result = await service.create(createDto);
      expect(result).toBe(createdAdditional);
      expect(createSpy).toHaveBeenCalledWith(createDto);
      expect(saveSpy).toHaveBeenCalledWith(createdAdditional);
    });
  });

  describe('findAll', () => {
    it('should return an array of additionals', async () => {
      const findAllResult: Additional[] = [
        { id: 1, name: 'Additional 1', price: 5.0, description: null, image_url: null },
        { id: 2, name: 'Additional 2', price: 3.0, description: null, image_url: null },
      ];

      const findAllSpy = jest.spyOn(repo, 'find').mockResolvedValue(findAllResult);

      const result = await service.findAll();
      expect(result).toEqual(findAllResult);
      expect(findAllSpy).toHaveBeenCalled();
    });
  });

  describe('findOneBy', () => {
    it('should return an additional by id', async () => {
      const id = 1;
      const findOneResult: Additional = {
        id,
        name: 'Additional 1',
        price: 5.0,
        description: null,
        image_url: null,
      };

      const findOneSpy = jest.spyOn(repo, 'findOneBy').mockResolvedValue(findOneResult);

      const result = await service.findOne(id);
      expect(result).toEqual(findOneResult);
      expect(findOneSpy).toHaveBeenCalledWith({ id });
    });

    it('should return null if additional is not found', async () => {
      const id = 99;

      const findOneSpy = jest.spyOn(repo, 'findOneBy').mockResolvedValue(null);

      const result = await service.findOne(id);
      expect(result).toBeNull();
      expect(findOneSpy).toHaveBeenCalledWith({ id });
    });
  });

  describe('update', () => {
    it('should update an additional', async () => {
      const id = 1;
      const updateDto = {
        name: 'Updated Additional',
        price: 7.5,
      };
      const updatedAdditional: Additional = {
        id,
        ...updateDto,
        description: null,
        image_url: null,
      };

      const findOneSpy = jest.spyOn(repo, 'findOneBy').mockResolvedValue(updatedAdditional);
      const saveSpy = jest.spyOn(repo, 'save').mockResolvedValue(updatedAdditional);

      const result = await service.update(id, updateDto);
      expect(result).toEqual(updatedAdditional);
      expect(findOneSpy).toHaveBeenCalledWith({ id });
      expect(saveSpy).toHaveBeenCalledWith(updatedAdditional);
    });

    it('should return null if additional is not found', async () => {
      const id = 99;
      const updateDto: UpdateAdditionalDto = {
        name: 'Updated Additional',
        price: 7.5,
      };

      const findOneSpy = jest.spyOn(repo, 'findOneBy').mockResolvedValue(null);

      const result = await service.update(id, updateDto);
      expect(result).toBeNull();
      expect(findOneSpy).toHaveBeenCalledWith({ id });
    });
  });

  describe('remove', () => {
    it('should remove an additional', async () => {
      const id = 1;
      const removedAdditional: Additional = { id, name: 'Additional 1', price: 5.0, description: null, image_url: null };

      const findOneSpy = jest.spyOn(repo, 'findOneBy').mockResolvedValue(removedAdditional);
      const removeSpy = jest.spyOn(repo, 'remove').mockResolvedValue(removedAdditional);

      const result = await service.remove(id);
      expect(result).toEqual(removedAdditional);
      expect(findOneSpy).toHaveBeenCalledWith({ id });
      expect(removeSpy).toHaveBeenCalledWith(removedAdditional);
    });

    it('should return null if additional is not found', async () => {
      const id = 99;

      const findOneSpy = jest.spyOn(repo, 'findOneBy').mockResolvedValue(null);

      const result = await service.remove(id);
      expect(result).toBeNull();
      expect(findOneSpy).toHaveBeenCalledWith({ id });
    });
  });
});