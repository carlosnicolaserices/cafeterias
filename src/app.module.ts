import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoffeeShopsModule } from './coffee-shops/coffee-shops.module';

@Module({
  imports: [
    // 1. Configuración Global (Lee el archivo .env)
    ConfigModule.forRoot({ isGlobal: true }),

    // 2. Conexión a Base de Datos Segura
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URI'),
      }),
      inject: [ConfigService],
    }),

    // 3. Tus Módulos de Funcionalidad
    CoffeeShopsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
