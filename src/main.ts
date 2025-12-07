import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilitar CORS para que Angular no te de problemas después
  app.enableCors();

  // 👇 ESTO ES LO QUE ARREGLA EL 502 EN POSTMAN
  // '0.0.0.0' le dice a la app: "Escucha peticiones que vengan de afuera"
  await app.listen(process.env.PORT || 3000, '0.0.0.0');

  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();