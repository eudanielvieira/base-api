import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { typeOrmConfigAsync } from './config/typeorm.config';

import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync(typeOrmConfigAsync),
    UsersModule,
    AuthModule,
  ],
  controllers: [],
})
export class AppModule {}
