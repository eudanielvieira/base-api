import {
  Injectable,
  UnprocessableEntityException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from 'src/entities/user.entity';
import { UserRepository } from './users.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRole } from './user-roles.enum';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}

  async createAdminUser(createUserDto: CreateUserDto): Promise<User> {
    if (createUserDto.password != createUserDto.passwordConfirmation) {
      throw new UnprocessableEntityException('As senhas não são iguais');
    } else {
      return this.userRepository.createUser(createUserDto, UserRole.ADMIN);
    }
  }

  async getAllUsers(): Promise<User[]> {
    return this.userRepository.find({
      select: ['id', 'email', 'name', 'role'],
    });
  }

  async getUserById(userId: string): Promise<User> {
    const user = await this.userRepository.findOne(userId, {
      select: ['id', 'email', 'name', 'role'],
    });

    if (!user) throw new NotFoundException('Usuário não encontrado');

    return user;
  }

  async updateUser(updateUserDto: UpdateUserDto, id: string) {
    const result = await this.userRepository.update({ id }, updateUserDto);
    if (result.affected > 0) {
      const user = await this.getUserById(id);
      return user;
    } else {
      throw new NotFoundException('Usuário não encontrado');
    }
  }

  async deleteUser(userId: string) {
    const result = await this.userRepository.delete({ id: userId });
    if (result.affected === 0) {
      throw new NotFoundException('Usuário não encontrado para exclusão');
    }
  }
}
