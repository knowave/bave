import { Request, Response } from 'express';
import UserService from '../../user/service/user.service';
import { STATUS_CODE } from '../../../exception/status-code';

export class AuthController {
  constructor(private userService: UserService) {}

  /**
   * 회원 로그인
   */
  public async signUp(req: Request, res: Response) {
    const { userId } = req.params;

    try {
      const user = await this.userService.findOndeByUser(Number(userId));
      return res.status(STATUS_CODE.SUCCESS.OK).send(user);
    } catch (error) {
      console.log('signUp ERROR: ', error);
      return res.status(STATUS_CODE.ERROR.BAD_REQUEST).send(error);
    }
  }
}
