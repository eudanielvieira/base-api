import { EntityRepository, Repository } from 'typeorm';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { hash, genSalt } from 'bcrypt';
import { randomBytes } from 'crypto';

import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import { UserRole } from './user-roles.enum';
import { LoginDto } from 'src/auth/dto/login.dto';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(
    createUserDto: CreateUserDto,
    role: UserRole,
  ): Promise<User> {
    const { email, name, password } = createUserDto;

    const user = this.create();
    user.name = name;
    user.email = email;
    user.status = true;
    user.role = role;
    user.salt = await genSalt();
    user.confirmationToken = randomBytes(32).toString('hex');

    user.password = await hash(password, user.salt);
    try {
      await user.save();
      delete user.password;
      delete user.salt;
      delete user.recoverToken;
      return user;
    } catch (error) {
      if (error.code.toString() === '23505') {
        throw new ConflictException('Email já cadastrado');
      } else {
        throw new InternalServerErrorException(
          'Erro ao salvar dados do usuário',
        );
      }
    }
  }

  async validateCredentials(loginDto: LoginDto): Promise<User> {
    const { username, password } = loginDto;
    const user = await this.findOne({ email: username, status: true });

    if (user && (await user.validatePassword(password))) {
      return user;
    } else {
      return null;
    }
  }
}
