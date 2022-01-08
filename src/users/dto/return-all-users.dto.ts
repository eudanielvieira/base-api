import { User } from '../../entities/user.entity';

export class ReturnAllUserDto {
  users: User[];
  numberOfUsers: number;
}
