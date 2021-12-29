import { IsString, MinLength, MaxLength, Matches } from 'class-validator';

export class ChangePasswordDto {
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
    message: 'A confirmação de senha deve ter no mínimo 6 caracteres',
  })
  @MaxLength(32, {
    message: 'A confirmação de senha pode ter no máximo 32 caracteres.',
  })
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'A confirmação de senha deve conter pelo menos uma letra maiúscula, uma letra minúscula, um número ou um símbulo',
  })
  passwordConfirmation: string;
}
