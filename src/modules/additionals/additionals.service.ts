import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAdditionalDto } from './dto/create-additional.dto';
import { UpdateAdditionalDto } from './dto/update-additional.dto';
import { Additional } from './entities/additional.entity';

@Injectable()
export class AdditionalsService {
  constructor(
    @InjectRepository(Additional)
    private readonly additionalRepository: Repository<Additional>,
  ) { }

  async create(createAdditionalDto: CreateAdditionalDto) {
    const additional = this.additionalRepository.create(createAdditionalDto);
    return await this.additionalRepository.save(additional);
  }

  async findAll() {
    return await this.additionalRepository.find();
  }


  async findOne(id: number) {
    return await this.additionalRepository.findOneBy({ id });
  }

  async update(id: number, updateAdditionalDto: UpdateAdditionalDto) {
    const additional = await this.additionalRepository.findOneBy({ id });

    if (!additional) return null;

    return await this.additionalRepository.save({ ...additional, ...updateAdditionalDto });
  }

  async remove(id: number) {
    const additional = await this.additionalRepository.findOneBy({ id });

    if (!additional) return null;

    return await this.additionalRepository.remove(additional);
  }
}