import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { STATUS_CODE } from '../../../exception/status-code';

const validate = async (req: Request, res: Response, next: NextFunction) => {
  const error = validationResult(req);

  if (error !== null) {
    return res.status(STATUS_CODE.ERROR.BAD_REQUEST).json({ Error: error.array() });

    next();
  }
};

export default validate;
