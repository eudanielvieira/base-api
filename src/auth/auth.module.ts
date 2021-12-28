import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';

import { UserRepository } from 'src/users/users.repository';
import { secretConfig } from 'src/config/jwt.config';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepository]),
    JwtModule.registerAsync(secretConfig),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
