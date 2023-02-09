import { Request, RequestHandler, Response } from 'express';
import { STATUS_CODE } from '../../../exception/status-code';
import AuthService from '../service/auth.service';
import RequestInterface from '../../../interface/requestInterface';

export class AuthController {
  constructor(private authService: AuthService) {}

  /**
   * 회원 로그인
   */
  public signUp: RequestHandler = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
      const user = await this.authService.findOneSignInUser(email);

      if (!user) {
        return res.status(STATUS_CODE.ERROR.NOT_FOUND).send({ ErrorMessage: '유저를 찾을 수 없습니다.' });
      }

      const compare = await this.authService.compareUser(email, password);

      if (!compare) {
        return res.status(STATUS_CODE.ERROR.NOT_FOUND).send({ ErrorMessage: '비밀번호가 일치하지 않습니다' });
      }

      const accessToken = await this.authService.generateToken(user.userId, user.email, user.password);
      const refreshToken = await this.authService.generateRefreshToken(user.userId, user.email, user.password);

      await this.authService.setCurrentRefreshToken(refreshToken, user.userId);

      return res.json({
        accessToken: accessToken,
        refreshToken: refreshToken,
      });
    } catch (error) {
      console.log('로그인 ERROR : ', error);
      return res.status(STATUS_CODE.ERROR.BAD_REQUEST).send({ message: '로그인에 실패하였습니다.' });
    }
  };

  /**
   * 회원 로그아웃
   */
  public signOut = async (req: RequestInterface, res: Response) => {
    const userId = req.user;
    try {
      await this.authService.removeRefreshToken(userId.userId);
      return res.status(STATUS_CODE.SUCCESS.OK).send({ message: '로그아웃 완료' });
    } catch (error) {
      console.log('로그아웃 ERROR : ', error);
      return res.status(STATUS_CODE.ERROR.BAD_REQUEST).send({ message: '로그아웃 실패' });
    }
  };
}
