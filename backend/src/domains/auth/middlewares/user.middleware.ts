import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import jwtObj from '../config/jwt.config';
import { STATUS_CODE } from '../../../exception/status-code';
import DataStoredInToken from '../../../interfaces/dataStored-in-token.interface';
import UserService from '../../user/service/user.service';
import { IUser } from '../../../types/custom';

export const userMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const userService = new UserService();
  if (req.headers.authorization) {
    const token = req.headers.authorization.split('Bearer ')[1];
    try {
      const verificationRes = jwt.verify(token, jwtObj.secret) as DataStoredInToken;
      const userId = verificationRes.userId;
      const user = (await userService.findOndByUser(userId)) as IUser;
      if (user) {
        req.users = user;
        next();
      } else {
        next(STATUS_CODE.ERROR.UNAUTHORIZED);
      }
    } catch (error) {
      res.status(STATUS_CODE.ERROR.UNAUTHORIZED).json({ errorMessage: '존재하지 않은 유저입니다.' });
      next();
    }
  }
};
