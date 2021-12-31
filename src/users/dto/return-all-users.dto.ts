import { User } from 'src/entities/user.entity';

export class ReturnAllUserDto {
  users: User[];
  numberOfUsers: number;
}
