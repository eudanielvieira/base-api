import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';
import { WinstonModule } from 'nest-winston';
import { AppModule } from './app.module';

import { swaggerConfig } from './config/swagger.config';
import { winstonConfig } from './config/winston.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix(process.env.PROJECT_PREFIX);

  WinstonModule.createLogger(winstonConfig);

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup(process.env.PROJECT_DOOCUMENTATION, app, document);

  await app.listen(process.env.PORT || 5000);
}
bootstrap()
  .then(() => {
    const logger = new Logger('main.ts');
    logger.log(
      `${process.env.PPROJECT_NAME} running on port ${process.env.PORT}`,
    );
  })
  .catch(console.log);
