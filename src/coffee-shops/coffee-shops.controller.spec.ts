import { Test, TestingModule } from '@nestjs/testing';
import { CoffeeShopsController } from './coffee-shops.controller';
import { CoffeeShopsService } from './coffee-shops.service';

describe('CoffeeShopsController', () => {
  let controller: CoffeeShopsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CoffeeShopsController],
      providers: [CoffeeShopsService],
    }).compile();

    controller = module.get<CoffeeShopsController>(CoffeeShopsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
