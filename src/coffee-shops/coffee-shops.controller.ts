import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CoffeeShopsService } from './coffee-shops.service';
import { CreateCoffeeShopDto } from './dto/create-coffee-shop.dto';
import { UpdateCoffeeShopDto } from './dto/update-coffee-shop.dto';

@Controller('coffee-shops')
export class CoffeeShopsController {
  constructor(private readonly coffeeShopsService: CoffeeShopsService) {}

  @Post()
  create(@Body() createCoffeeShopDto: CreateCoffeeShopDto) {
    return this.coffeeShopsService.create(createCoffeeShopDto);
  }

  @Get()
  findAll() {
    return this.coffeeShopsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.coffeeShopsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCoffeeShopDto: UpdateCoffeeShopDto) {
    return this.coffeeShopsService.update(+id, updateCoffeeShopDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.coffeeShopsService.remove(+id);
  }
}
