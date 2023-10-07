/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);

  const config = new DocumentBuilder()
    .setTitle('CyberGarden Weather Measures Service')
    .setDescription('This api need for store senstor call-shot data')
    .setVersion('1.0')
    .addTag('Measures Service')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const port = process.env.MEASURES_SERVICE_PORT || 3000;
  app.enableCors();
  await app.listen(port);
  Logger.log(
    `🚀 Measures Service is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
