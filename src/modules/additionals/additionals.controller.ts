import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AdditionalsService } from './additionals.service';
import { CreateAdditionalDto } from './dto/create-additional.dto';
import { UpdateAdditionalDto } from './dto/update-additional.dto';

@Controller('additionals')
export class AdditionalsController {
  private readonly additionalsService: AdditionalsService;

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async create(@Body() createAdditionalDto: CreateAdditionalDto) {
    return await this.additionalsService.create(createAdditionalDto);
  }

  @Get()
  async findAll() {
    return await this.additionalsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.additionalsService.findOne(id);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateAdditionalDto: UpdateAdditionalDto,
  ) {
    return await this.additionalsService.update(id, updateAdditionalDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.additionalsService.remove(id);
  }
}
