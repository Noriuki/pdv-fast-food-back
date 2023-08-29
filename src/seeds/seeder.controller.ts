import { Controller, Get } from '@nestjs/common';
import { SeedService } from './seeder';

@Controller('seeder')
export class SeederController {
  constructor(private readonly seedService: SeedService) {}

  @Get()
  async fetchSeed() {
    return await this.seedService.seed();
  }
}
