import { PartialType } from '@nestjs/mapped-types';
import { CreateCafeteriaDto } from './create-coffee-shop.dto';

export class UpdateCoffeeShopDto extends PartialType(CreateCafeteriaDto) {}
