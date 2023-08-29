import { Test, TestingModule } from '@nestjs/testing';
import { AdditionalsController } from './additionals.controller';
import { AdditionalsService } from './additionals.service';
import { Additional } from './entities/additional.entity';

describe('AdditionalsController', () => {
  let controller: AdditionalsController;
  let service: AdditionalsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdditionalsController],
      providers: [
        {
          provide: AdditionalsService,
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

    controller = module.get<AdditionalsController>(AdditionalsController);
    service = module.get<AdditionalsService>(AdditionalsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create an additional', async () => {
      const createDto = { name: 'Additional', price: 5.0 };
      const createdAdditional: Additional = {
        id: 1,
        ...createDto,
        description: null,
        image_url: null,
      };

      jest.spyOn(service, 'create').mockResolvedValue(createdAdditional);

      const result = await controller.create(createDto);
      expect(result).toBe(createdAdditional);
    });
  });

  describe('findAll', () => {
    it('should return an array of additionals', async () => {
      const mockAdditionals: Additional[] = [
        {
          id: 1,
          name: 'Additional 1',
          price: 5.0,
          description: null,
          image_url: null,
        },
        {
          id: 2,
          name: 'Additional 2',
          price: 3.0,
          description: null,
          image_url: null,
        },
      ];

      jest.spyOn(service, 'findAll').mockResolvedValue(mockAdditionals);

      const result = await controller.findAll();
      expect(result).toBe(mockAdditionals);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return an additional by id', async () => {
      const id = 1;
      const mockAdditional: Additional = {
        id,
        name: 'Additional 1',
        price: 5.0,
        description: null,
        image_url: null,
      };

      jest.spyOn(service, 'findOne').mockResolvedValue(mockAdditional);

      const result = await controller.findOne(id);
      expect(result).toBe(mockAdditional);
      expect(service.findOne).toHaveBeenCalledWith(id);
    });
  });

  describe('update', () => {
    it('should update an additional', async () => {
      const id = 1;
      const updateDto = { name: 'Updated Additional', price: 7.0 };
      const updatedAdditional: Additional = {
        id,
        ...updateDto,
        description: null,
        image_url: null,
      };

      jest.spyOn(service, 'update').mockResolvedValue(updatedAdditional);

      const result = await controller.update(id, updateDto);
      expect(result).toBe(updatedAdditional);
      expect(service.update).toHaveBeenCalledWith(id, updateDto);
    });
  });

  describe('remove', () => {
    it('should remove an additional', async () => {
      const id = 1;
      const removeResponse: Additional = {
        id,
        name: 'Additional 1',
        price: 5.0,
        description: null,
        image_url: null,
      };

      jest.spyOn(service, 'remove').mockResolvedValue(removeResponse);

      const result = await controller.remove(id);
      expect(result).toBe(removeResponse);
      expect(service.remove).toHaveBeenCalledWith(id);
    });
  });
});
