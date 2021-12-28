import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { UserRepository } from 'src/users/users.repository';

import { CreateUserDto } from 'src/users/dto/create-user.dto';

import { User } from '../users/user.entity';
import { UserRole } from '../users/user-roles.enum';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}

  async register(createUserDto: CreateUserDto): Promise<User> {
    if (createUserDto.password != createUserDto.passwordConfirmation) {
      throw new UnprocessableEntityException('As senhas não são iguais');
    } else {
      return await this.userRepository.createUser(createUserDto, UserRole.USER);
    }
  }

  login(): string {
    return 'login';
  }
}
