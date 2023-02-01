import UserService from '../service/user.service';
import { Request, RequestHandler, Response } from 'express';
import { STATUS_CODE } from '../../../exception/status-code';

export default class UserController {
  constructor(private userService: UserService) {}

  /**
   * 유저 생성
   */
  public findOrCreate: RequestHandler = async (req: Request, res: Response) => {
    const { userId, email, username } = req.body;

    try {
      const user = await this.userService.findOrCreate(userId, email, username);
      return res.status(STATUS_CODE.SUCCESS.OK).json(user);
    } catch (error) {
      console.log('유저 생성 ERROR : ', error);
      return res.status(STATUS_CODE.ERROR.BAD_REQUEST).send(error);
    }
  };

  public findOneByUser: RequestHandler = async (req: Request, res: Response) => {
    const { userId } = req.params;

    try {
      const user = await this.userService.findOndeByUser(userId);
      return res.status(STATUS_CODE.SUCCESS.OK).json(user);
    } catch (error) {
      console.log('특정 유저 조회 ERROR : ', error);
      return res.status(STATUS_CODE.ERROR.BAD_REQUEST).send(error);
    }
  };
}
