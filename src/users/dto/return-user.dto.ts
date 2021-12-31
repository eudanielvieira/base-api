import { User } from 'src/entities/user.entity';

export class ReturnUserDto {
  user: User;
  message: string;
}
