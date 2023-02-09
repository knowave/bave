import { Users } from '../domains/user/entity/user.entity';
import { Request } from 'express';

export default interface RequestInterface extends Request {
  user: Users;
  userId: number;
}
