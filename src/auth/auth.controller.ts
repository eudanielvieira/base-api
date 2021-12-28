import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';

import { AuthService } from './auth.service';

import { CreateUserDto } from '../users/dto/create-user.dto';

@Controller('v1/users')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Customer Registration' })
  async register(@Body(ValidationPipe) createUserDto: CreateUserDto) {
    await this.authService.register(createUserDto);
    return {
      message: 'Usuário criado com sucesso',
    };
  }

  @Post('login')
  @ApiOperation({ summary: 'User Login' })
  async login() {
    return this.authService.login();
  }
}
