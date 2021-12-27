import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Body,
  Param,
  ValidationPipe,
} from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';

import { UsersService } from './users.service';

import { CreateUserDto } from './dto/create-user.dto';
import { ReturnUserDto } from './dto/return-user.dto';
import { ReturnAllUserDto } from './dto/return-all-users.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('v1/users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Create admin user' })
  @Get()
  async createAdminUser(
    @Body(ValidationPipe) createUserDto: CreateUserDto,
  ): Promise<ReturnUserDto> {
    const user = await this.usersService.createAdminUser(createUserDto);
    return {
      user,
      message: 'Administrador cadastrado com sucesso',
    };
  }

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  async getAllUsers(): Promise<ReturnAllUserDto> {
    const users = await this.usersService.getAllUsers();
    return {
      users,
      numberOfUsers: users.length,
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user by id' })
  async getUserById(@Param('id') id: string): Promise<ReturnUserDto> {
    const user = await this.usersService.getUserById(id);
    return {
      user,
      message: 'Usuário encontrado',
    };
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update user by id' })
  async updateUser(
    @Body(ValidationPipe) updateUserDto: UpdateUserDto,
    @Param('id') id: string,
  ) {
    return this.usersService.updateUser(updateUserDto, id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete user by id' })
  async deleteUser(@Param('id') id: string) {
    await this.usersService.deleteUser(id);
    return {
      message: 'Usuario deletado com sucesso',
    };
  }
}
