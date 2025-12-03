import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCoffeeShopDto } from './dto/create-coffee-shop.dto'; // Asegúrate que esta ruta exista
import { UpdateCoffeeShopDto } from './dto/update-coffee-shop.dto';
import { CoffeeShop, CoffeeShopDocument } from './entities/coffee-shop.entity'; // Importante: Tu esquema

@Injectable()
export class CoffeeShopsService {
  // 1. Inyectamos el modelo de Mongoose para poder usar la DB
  constructor(
    @InjectModel(CoffeeShop.name) private coffeeModel: Model<CoffeeShopDocument>,
  ) { }

  // 2. Lógica REAL para crear (POST)
  async create(createCoffeeShopDto: CreateCoffeeShopDto) {
    const newCoffeeShop = await this.coffeeModel.create(createCoffeeShopDto);
    return newCoffeeShop; // Esto devuelve el objeto creado con su _id
  }

  // 3. Lógica REAL para listar todo (GET)
  async findAll() {
    return this.coffeeModel.find().exec(); // Esto va a Mongo y trae el array
  }

  // (Opcional) Puedes dejar estos como placeholders por ahora o borrarlos
  findOne(id: number) {
    return `This action returns a #${id} coffeeShop`;
  }

  update(id: number, updateCoffeeShopDto: UpdateCoffeeShopDto) {
    return `This action updates a #${id} coffeeShop`;
  }

  remove(id: number) {
    return `This action removes a #${id} coffeeShop`;
  }
}