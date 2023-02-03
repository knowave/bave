import { Request, Response } from 'express';
import UserService from '../../user/service/user.service';
import { STATUS_CODE } from '../../../exception/status-code';
import AuthService from '../service/auth.service';

export class AuthController {
  constructor(private userService: UserService, private authService: AuthService) {}

  /**
   * 회원 로그인
   */
  public async signUp(req: Request, res: Response) {
    const { email, password } = req.body;

    try {
      const user = await this.userService.findOneSignInUser(email);

      if (!user) {
        return res.status(STATUS_CODE.ERROR.NOT_FOUND).send({ ErrorMessage: '유저를 찾을 수 없습니다.' });
      }

      const compare = await this.authService.compareUser(email, password);

      if (!compare) {
        return res.status(STATUS_CODE.ERROR.NOT_FOUND).send({ ErrorMessage: '비밀번호가 일치하지 않습니다' });
      }

      const token = await this.authService.generateToken(user.userId, email, user.password);

      return res.json({ token });
    } catch (error) {
      console.log('로그인 ERROR : ', error);
      return res.status(STATUS_CODE.ERROR.BAD_REQUEST).send({ message: '로그인에 실패하였습니다.' });
    }
  }
}
