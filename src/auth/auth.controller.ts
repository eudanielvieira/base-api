import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';

import { CreateUserDto } from 'src/users/dto/create-user.dto';

import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';

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
  async login(@Body(ValidationPipe) logindto: LoginDto) {
    return this.authService.login(logindto);
  }
}
