import {NestFactory} from '@nestjs/core';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {});

  const port = Number.parseInt(process.env.PORT || '3001', 10);
  app.enableCors();
  await app.listen(port);
}

bootstrap();
