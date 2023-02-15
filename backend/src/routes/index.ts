import { Router } from 'express';
import BeachRouter from '../domains/beach/router/beach.router';
import UserRouter from '../domains/user/router/user.router';
import AuthRouter from '../domains/auth/router/auth.router';
import FeedRouter from '../domains/feed/router/feed.router';

class Routes {
  private router;
  constructor() {
    this.router = Router() as Router;
  }
  public routes(): Router {
    this.router.use('/beach', BeachRouter);
    this.router.use('/users', UserRouter);
    this.router.use('/auth', AuthRouter);
    this.router.use('/feed', FeedRouter);
    return this.router;
  }
}

export default new Routes().routes();
