import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';

import { UserRepository } from 'src/users/users.repository';

import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginDto } from './dto/login.dto';

import { User } from '../users/user.entity';
import { UserRole } from '../users/user-roles.enum';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async register(createUserDto: CreateUserDto): Promise<User> {
    if (createUserDto.password != createUserDto.passwordConfirmation) {
      throw new UnprocessableEntityException('As senhas não são iguais');
    } else {
      return await this.userRepository.createUser(createUserDto, UserRole.USER);
    }
  }

  async login(loginDto: LoginDto) {
    const user = await this.userRepository.validateCredentials(loginDto);

    if (user === null) {
      throw new UnprocessableEntityException('Usuário ou senha inválidos');
    }

    const jwtPayload = {
      id: user.id,
    };
    const token = this.jwtService.sign(jwtPayload);

    return { token };
  }
}
