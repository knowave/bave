import { Users } from '../domains/user/entity/user.entity';

declare module 'express-serve-static-core' {
  interface Request {
    user?: Users;
  }
}
