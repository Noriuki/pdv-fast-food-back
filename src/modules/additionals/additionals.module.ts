import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdditionalsController } from './additionals.controller';
import { AdditionalsService } from './additionals.service';
import { Additional } from './entities/additional.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Additional])],
  controllers: [AdditionalsController],
  providers: [AdditionalsService],
  exports: [AdditionalsService],
})
export class AdditionalsModule {}
