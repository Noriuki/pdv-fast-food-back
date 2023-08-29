import { Controller, Get } from '@nestjs/common';
import { SeedService } from './seeder';

@Controller('seeder')
export class SeederController {
  constructor(private readonly seedService: SeedService) {}

  @Get()
  fetchSeed() {
    return this.seedService.seed();
  }
}
