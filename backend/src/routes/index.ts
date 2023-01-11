import { Router } from 'express';
import BeachRouter from './beach.router';

class Routes {
  private router;
  constructor() {
    this.router = Router() as Router;
  }
  public routes(): Router {
    this.router.use('/beach', BeachRouter);
    return this.router;
  }
}

export default new Routes().routes();
