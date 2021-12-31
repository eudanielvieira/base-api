import {
  Injectable,
  UnprocessableEntityException,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
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
    private configService: ConfigService,
    private mailerService: MailerService,
  ) {}

  protected setNoReplayMail() {
    return this.configService.get<string>('NO_REPLY_EMAIL');
  }

  protected setResetPasswordLink(token: string): string {
    const frontEndURL = this.configService.get<string>('FRONT_END_URL');
    return `${frontEndURL}/reset-password/?token=${token}`;
  }

  protected setConfirmationToken(token: string): string {
    const frontEndURL = this.configService.get<string>('FRONT_END_URL');
    return `${frontEndURL}/email-confirmation/?token=${token}`;
  }

  async register(createUserDto: CreateUserDto): Promise<User> {
    if (createUserDto.password != createUserDto.passwordConfirmation) {
      throw new UnprocessableEntityException('As senhas não são iguais');
    } else {
      const user = await this.userRepository.createUser(
        createUserDto,
        UserRole.USER,
      );

      const mail = {
        to: user.email,
        from: this.setNoReplayMail(),
        subject: 'Portal PBM - Email de confirmação',
        template: './email-confirmation',
        context: {
          emailConfirmationLink: this.setConfirmationToken(
            user.confirmationToken,
          ),
        },
      };
      await this.mailerService.sendMail(mail);

      return user;
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

    const mail = {
      to: user.email,
      from: this.setNoReplayMail(),
      subject: 'Portal PBM - Recuperação de senha',
      template: './recover-password',
      context: {
        resetPasswordLink: this.setResetPasswordLink(user.confirmationToken),
      },
    };
    await this.mailerService.sendMail(mail);
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
