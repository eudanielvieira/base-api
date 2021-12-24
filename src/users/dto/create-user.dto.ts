import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({
    message: 'Informe o nome do usuário',
  })
  @MaxLength(255, {
    message: 'O nome do usuário não pode ter mais de 255 caracteres',
  })
  name: string;

  @IsNotEmpty({
    message: 'O campo email é obrigatório',
  })
  @IsEmail(
    {},
    {
      message: 'Informe um endereço de email válido',
    },
  )
  @MaxLength(255, {
    message: 'O endereço de email não pode ter mais de 255 caracteres',
  })
  email: string;

  @IsNotEmpty({
    message: 'O campo senha é obrigatório',
  })
  @MinLength(6, {
    message: 'A senha deve ter no mínimo 6 caracteres',
  })
  password: string;

  @IsNotEmpty({
    message: 'O campo confirmação de senha é obrigatório',
  })
  @MinLength(6, {
    message: 'A confirmação de senha deve ter no mínimo 6 caracteres',
  })
  passwordConfirmation: string;
}
