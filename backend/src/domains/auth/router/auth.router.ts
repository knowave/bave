import { AuthController } from '../controller/auth.controller';
import UserService from '../../user/service/user.service';
import { Router } from 'express';
import AuthService from '../service/auth.service';
import validate from '../middlewares/login.middleware';

class AuthRouter {
  public usersService: UserService;
  public authService: AuthService;
  public authController: AuthController;
  private authRouter: Router;

  constructor() {
    this.authRouter = Router() as Router;
    this.usersService = new UserService();
    this.authService = new AuthService();
    this.authController = new AuthController(this.usersService, this.authService);
  }

  authMainRouter(): Router {
    this.authRouter.post('/sign-in', validate, this.authController.signUp);
    return this.authRouter;
  }
}

export default new AuthRouter().authMainRouter();
