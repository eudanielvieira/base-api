import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '../../users/user-roles.enum';
import { IsString, IsEmail, IsOptional } from 'class-validator';
export class UpdateUserDto {
  @IsOptional()
  @IsString({
    message: 'Infomre um nome válido',
  })
  @ApiProperty()
  name: string;

  @IsOptional()
  @IsEmail(
    {},
    {
      message: 'Infomre um email válido',
    },
  )
  @ApiProperty()
  email: string;

  @IsOptional()
  @ApiProperty()
  role: UserRole;

  @IsOptional()
  @ApiProperty()
  status: boolean;
}
