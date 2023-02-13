import { AuthController } from '../controller/auth.controller';
import { Router } from 'express';
import AuthService from '../service/auth.service';
import { authCheck } from '../middlewares/auth-check.middleware';
import { userMiddleware } from '../middlewares/user.middleware';

class AuthRouter {
  public authService: AuthService;
  public authController: AuthController;
  private authRouter: Router;

  constructor() {
    this.authRouter = Router() as Router;
    this.authService = new AuthService();
    this.authController = new AuthController(this.authService);
  }

  authMainRouter(): Router {
    this.authRouter.post('/sign-in', this.authController.signIn);
    this.authRouter.post('/sign-out', userMiddleware, authCheck, this.authController.signOut);
    return this.authRouter;
  }
}

export default new AuthRouter().authMainRouter();
