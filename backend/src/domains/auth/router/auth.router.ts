import { AuthController } from '../controller/auth.controller';
import { Router } from 'express';
import AuthService from '../service/auth.service';

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
    // this.authRouter.post('/sign-in', validate, this.authController.signUp);
    this.authRouter.post('/sign-in', this.authController.signUp);
    this.authRouter.get('/:email', this.authController.findOneByEmail);
    return this.authRouter;
  }
}

export default new AuthRouter().authMainRouter();
