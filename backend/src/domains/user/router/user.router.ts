import BeachService from '../../beach/service/beach.service';
import BeachController from '../../beach/controller/beach.controller';
import { Router } from 'express';
import UserService from '../service/user.service';
import UserController from '../controller/user.controller';

class UserRouter {
  public userService: UserService;
  public userController: UserController;
  private userRouter: Router;

  constructor() {
    this.userRouter = Router() as Router;
    this.userService = new BeachService();
    this.userController = new BeachController(this.userService);
  }

  userMainRouter(): Router {
    this.userRouter.post('/', this.userController.findOrCreate);
    this.userRouter.get('/:userId', this.userController.findOneByUser);
    return this.userRouter;
  }
}

export default new UserRouter().userMainRouter();
