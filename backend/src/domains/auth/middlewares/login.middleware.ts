import { NextFunction, Request, Response } from 'express';
import { STATUS_CODE } from '../../../exception/status-code';

exports.isLoggedIn = (req: Request, res: Response, next: NextFunction) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(STATUS_CODE.ERROR.FORBIDDEN).send('로그인이 필요합니다.');
  }
};

exports.isNotLoggedIn = (req: Request, res: Response, next: NextFunction) => {
  if (!req.isAuthenticated()) {
    next();
  } else {
    const message = encodeURIComponent('이미 로그인한 상태입니다.');
    res.redirect(`/?error=${message}`);
  }
};
