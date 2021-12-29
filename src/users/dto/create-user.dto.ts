import {
  IsEmail,
  IsNotEmpty,
  MaxLength,
  MinLength,
  Matches,
  IsString,
} from 'class-validator';

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

  @IsString({
    message: 'Informe uma senha válida',
  })
  @MinLength(6, {
    message: 'A senha deve ter no mínimo 6 caracteres',
  })
  @MaxLength(32, {
    message: 'A senha pode ter no máximo 32 caracteres.',
  })
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'A senha deve conter pelo menos uma letra maiúscula, uma letra minúscula, um número ou um símbulo',
  })
  password: string;

  @IsString({
    message: 'Informe uma senha válida',
  })
  @MinLength(6, {
    message: 'A senha deve ter no mínimo 6 caracteres',
  })
  @MaxLength(32, {
    message: 'A senha pode ter no máximo 32 caracteres.',
  })
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'A senha deve conter pelo menos uma letra maiúscula, uma letra minúscula, um número ou um símbulo',
  })
  passwordConfirmation: string;
}
