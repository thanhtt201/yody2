import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config'
// import { ValidationPipe } from './share/pipe/validation.pipe';

const configService = new ConfigService();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(configService.get<number>('PORT') || 3000);
}
bootstrap();
