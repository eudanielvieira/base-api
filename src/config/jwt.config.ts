import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';

export default class SecretConfig {
  static getSecretConfig(configService: ConfigService): JwtModuleOptions {
    return {
      secret: configService.get<string>('SECRET_KEY'),
      signOptions: {
        expiresIn: configService.get<number>('TOKEN_EXPIRATION_TIME'),
      },
    };
  }
}

export const secretConfig = {
  imports: [ConfigModule],
  useFactory: async (configService: ConfigService): Promise<JwtModuleOptions> =>
    SecretConfig.getSecretConfig(configService),
  inject: [ConfigService],
};
