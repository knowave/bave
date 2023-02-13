import { IUser, Beach } from './custom';

export {};

declare global {
  namespace Express {
    export interface Request {
      users?: IUser;
      beach?: Beach;
    }
  }
}
