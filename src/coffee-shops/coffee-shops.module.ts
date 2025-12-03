import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CoffeeShopsService } from './coffee-shops.service';
import { CoffeeShopsController } from './coffee-shops.controller';
import { CoffeeShop, CoffeeShopSchema } from './entities/coffee-shop.entity';

@Module({
  imports: [
    // Aquí le decimos a Mongoose que este módulo usa esa colección
    MongooseModule.forFeature([
      { name: CoffeeShop.name, schema: CoffeeShopSchema }
    ]),
  ],
  controllers: [CoffeeShopsController],
  providers: [CoffeeShopsService],
})
export class CoffeeShopsModule { }