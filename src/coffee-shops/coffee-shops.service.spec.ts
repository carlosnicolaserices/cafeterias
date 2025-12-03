import { Test, TestingModule } from '@nestjs/testing';
import { CoffeeShopsService } from './coffee-shops.service';

describe('CoffeeShopsService', () => {
  let service: CoffeeShopsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CoffeeShopsService],
    }).compile();

    service = module.get<CoffeeShopsService>(CoffeeShopsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
