import { AuthController } from '../controller/auth.controller';
import UserService from '../../user/service/user.service';
import { Router } from 'express';

class AuthRouter {
  public usersService: UserService;
  public authController: AuthController;
  private authRouter: Router;

  constructor() {
    this.authRouter = Router() as Router;
    this.usersService = new UserService();
    this.authController = new AuthController(this.usersService);
  }

  authMainRouter(): Router {
    this.authRouter.post('/sign-in', this.authController.signUp);
    return this.authRouter;
  }
}

export default new AuthRouter().authMainRouter();
