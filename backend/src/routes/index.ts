import { Router } from 'express';
import BeachRouter from '../domains/beach/router/beach.router';
import UserRouter from '../domains/user/router/user.router';

class Routes {
  private router;
  constructor() {
    this.router = Router() as Router;
  }
  public routes(): Router {
    this.router.use('/beach', BeachRouter);
    this.router.use('/user', UserRouter);
    return this.router;
  }
}

export default new Routes().routes();
