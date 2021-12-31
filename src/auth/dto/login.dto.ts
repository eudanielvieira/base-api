import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MaxLength, IsEmail, MinLength } from 'class-validator';
export class LoginDto {
  @IsNotEmpty({
    message: 'O campo usuário é obrigatório',
  })
  @IsEmail(
    {},
    {
      message: 'Informe um endereço de email válido',
    },
  )
  @MaxLength(255, {
    message: 'O endereço de usuário não pode ter mais de 255 caracteres',
  })
  @ApiProperty()
  username: string;

  @IsNotEmpty({
    message: 'A campo senha é obrigatório',
  })
  @MinLength(6, {
    message: 'A senha deve ter no mínimo 6 caracteres',
  })
  @ApiProperty()
  password: string;
}
