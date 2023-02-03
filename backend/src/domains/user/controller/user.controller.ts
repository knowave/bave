import UserService from '../service/user.service';
import { Request, RequestHandler, Response } from 'express';
import { STATUS_CODE } from '../../../exception/status-code';
import { CreateUserDto } from '../dto/create-user.dto';

export default class UserController {
  constructor(private userService: UserService) {}

  /**
   * 유저 생성
   */
  public creatUser: RequestHandler = async (req: Request, res: Response) => {
    const createUser: CreateUserDto = req.body;

    try {
      const user = await this.userService.creatUser(createUser);
      return res.status(STATUS_CODE.SUCCESS.OK).json(user);
    } catch (error) {
      console.log('유저 생성 ERROR : ', error);
      return res.status(STATUS_CODE.ERROR.BAD_REQUEST).send(error);
    }
  };

  public findOneByUser: RequestHandler = async (req: Request, res: Response) => {
    const { userId } = req.params;

    try {
      const user = await this.userService.findOndByUser(Number(userId));
      return res.status(STATUS_CODE.SUCCESS.OK).json(user);
    } catch (error) {
      console.log('특정 유저 조회 ERROR : ', error);
      return res.status(STATUS_CODE.ERROR.BAD_REQUEST).send(error);
    }
  };
}
