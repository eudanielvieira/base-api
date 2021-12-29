import {
  Injectable,
  UnprocessableEntityException,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { randomBytes } from 'crypto';

import { UserRepository } from 'src/users/users.repository';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UserRole } from 'src/users/user-roles.enum';
import { User } from 'src/entities/user.entity';

import { LoginDto } from './dto/login.dto';
import { ChangePasswordDto } from './dto/change-password.dto';

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
      // TODO: Enviar email de confirmação de cadastro
      return await this.userRepository.createUser(createUserDto, UserRole.USER);
    }
  }

  async login(loginDto: LoginDto) {
    const user = await this.userRepository.login(loginDto);

    if (user === null) {
      throw new UnauthorizedException('Usuário ou senha inválidos');
    }

    const jwtPayload = {
      id: user.id,
    };
    const token = this.jwtService.sign(jwtPayload);

    return { token };
  }

  async confirmEmail(confirmationToken: string): Promise<void> {
    const result = await this.userRepository.update(
      { confirmationToken },
      { confirmationToken: null },
    );
    if (result.affected === 0) {
      throw new NotFoundException('Token inválido');
    }
  }

  async sendRecoverPasswordEmail(email: string): Promise<void> {
    const user = await this.userRepository.findOne({ email });

    if (!user) {
      throw new NotFoundException('Não há usuário cadastrado com esse email.');
    }

    user.recoverToken = randomBytes(32).toString('hex');
    await user.save();

    // TODO: Enviar email de recuperação de senha
  }

  async changePassword(
    id: string,
    changePasswordDto: ChangePasswordDto,
  ): Promise<void> {
    const { password, passwordConfirmation } = changePasswordDto;

    if (password != passwordConfirmation) {
      throw new UnprocessableEntityException('As senhas não são iguais');
    }

    await this.userRepository.changePassword(id, password);
  }

  async resetPassword(
    recoverToken: string,
    changePasswordDto: ChangePasswordDto,
  ): Promise<void> {
    const user = await this.userRepository.findOne(
      { recoverToken },
      {
        select: ['id'],
      },
    );
    if (!user) {
      throw new NotFoundException('Token de inválido.');
    }
    try {
      await this.changePassword(user.id.toString(), changePasswordDto);
    } catch (error) {
      throw error;
    }
  }
}
