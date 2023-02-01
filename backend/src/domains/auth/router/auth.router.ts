import { Request, Response, Router } from 'express';
import passport from 'passport';

class AuthRouter {
  private readonly authRouter: Router;

  constructor() {
    this.authRouter = Router() as Router;
  }

  authMainRouter(): Router {
    this.authRouter.get('/logout', (req: Request, res: Response) => {
      req.logout((done) => {
        done();
      });
      req.session.destroy((done) => {
        done();
      });
      res.redirect('/');
    });
    this.authRouter.get('/kakao', passport.authenticate('kakao'));
    this.authRouter.get(
      '/kakao/callback',
      passport.authenticate('kakao', {
        failureRedirect: '/',
      }),
      (req: Request, res: Response) => {
        res.redirect('/');
      },
    );
    return this.authRouter;
  }
}

export default new AuthRouter().authMainRouter();
