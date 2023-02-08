import { Request, RequestHandler, Response } from 'express';
import { STATUS_CODE } from '../../../exception/status-code';
import AuthService from '../service/auth.service';

export class AuthController {
  constructor(private authService: AuthService) {}

  /**
   * email 유저 조회
   */
  public findOneByEmail: RequestHandler = async (req: Request, res: Response) => {
    const { email } = req.params;

    try {
      const user = await this.authService.findOneSignInUser(email);

      if (!user) {
        return res.status(STATUS_CODE.ERROR.BAD_REQUEST).send({ errorMessage: '없는 유저' });
      }

      return res.json({ user });
    } catch (error) {
      console.log(error);
    }
  };

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
}
