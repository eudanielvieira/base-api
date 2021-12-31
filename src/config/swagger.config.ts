import { DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

const configService = new ConfigService();

export const swaggerConfig = new DocumentBuilder()
  .setTitle(configService.get<string>('PPROJECT_NAME'))
  .setDescription(configService.get<string>('PPROJECT_DESCRIPTION'))
  .setVersion(configService.get<string>('PPROJECT_VERSION'))
  .build();
