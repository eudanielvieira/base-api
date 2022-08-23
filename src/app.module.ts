import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailerModule } from '@nestjs-modules/mailer';
import { WinstonModule } from 'nest-winston';

import { typeOrmConfigAsync } from './config/typeorm.config';
import { mailerConfig } from './config/mailer.config';
import { winstonConfig } from './config/winston.config';

import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

import { LoggerInterceptor } from './shared/logger.interceptor';
import { ItemsModule } from './items/items.module';
import { CategoryModule } from './category/category.module';
import { VariablesModule } from './variables/variables.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync(typeOrmConfigAsync),
    MailerModule.forRootAsync(mailerConfig),
    WinstonModule.forRoot(winstonConfig),
    UsersModule,
    AuthModule,
    ItemsModule,
    CategoryModule,
    VariablesModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggerInterceptor,
    },
  ],
})
export class AppModule {}
