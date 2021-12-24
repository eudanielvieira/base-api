import { User } from '../user.entity';

export class ReturnAllUserDto {
  users: User[];
  numberOfUsers: number;
}
