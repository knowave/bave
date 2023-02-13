import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { STATUS_CODE } from '../../../exception/status-code';
import jwtObj from '../config/jwt.config';
import dotenv from 'dotenv';
dotenv.config();
export const authCheck = async (req: Request, res: Response, next: NextFunction) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split('Bearer ')[1];

    jwt.verify(token, jwtObj.secret, (error: any) => {
      if (error) {
        res.status(STATUS_CODE.ERROR.UNAUTHORIZED).json({ errorMessage: '인증이 되지 않았습니다.' });
      } else {
        next();
      }
    });
  } else {
    res.status(STATUS_CODE.ERROR.UNAUTHORIZED).json({ errorMessage: '인증이 되지 않았습니다.' });
  }
};
