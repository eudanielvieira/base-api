import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

import config from './config/swagger.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix(process.env.PROJECT_PREFIX);

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(process.env.PROJECT_DOOCUMENTATION, app, document);

  await app.listen(process.env.PORT || 5000);
}
bootstrap();
