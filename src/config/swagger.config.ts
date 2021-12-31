import { DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

const configService = new ConfigService();

export const swaggerConfig = new DocumentBuilder()
  .setTitle(configService.get<string>('PPROJECT_NAME'))
  .setDescription(configService.get<string>('PPROJECT_DESCRIPTION'))
  .setVersion(configService.get<string>('PPROJECT_VERSION'))
  .addBearerAuth(
    {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      name: 'Authorization',
      description: 'Enter JWT token',
      in: 'Header',
    },
    'access-token',
  )
  .build();
