import { Router } from 'express';
import UserService from '../service/user.service';
import UserController from '../controller/user.controller';

class UserRouter {
  public userService: UserService;
  public userController: UserController;
  private userRouter: Router;

  constructor() {
    this.userRouter = Router() as Router;
    this.userService = new UserService();
    this.userController = new UserController(this.userService);
  }

  userMainRouter(): Router {
    this.userRouter.post('/', this.userController.findOrCreate);
    this.userRouter.get('/:userId', this.userController.findOneByUser);
    return this.userRouter;
  }
}

export default new UserRouter().userMainRouter();
