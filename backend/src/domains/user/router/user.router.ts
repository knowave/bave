import BeachService from '../../beach/service/beach.service';
import BeachController from '../../beach/controller/beach.controller';
import { Router } from 'express';

class UserRouter {
  public userService: BeachService;
  public userController: BeachController;
  private userRouter: Router;

  constructor() {
    this.userRouter = Router() as Router;
    this.userService = new BeachService();
    this.userController = new BeachController(this.userService);
  }

  userMainRouter(): Router {
    this.userRouter.post('/', this.userController.findOneBeach);
    return this.userRouter;
  }
}

export default new UserRouter().userMainRouter();
