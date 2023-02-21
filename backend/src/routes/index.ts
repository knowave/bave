import { Router } from 'express';
import BeachRouter from '../domains/beach/router/beach.router';
import UserRouter from '../domains/user/router/user.router';
import AuthRouter from '../domains/auth/router/auth.router';
import FeedRouter from '../domains/feed/router/feed.router';
import ReplyRouter from '../domains/reply/router/reply.router';
import BookmarkRouter from '../domains/bookmark/router/bookmark.router';
import LikeRouter from '../domains/like/router/like.router';

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
    this.router.use('/reply', ReplyRouter);
    this.router.use('/bookmark', BookmarkRouter);
    this.router.use('/like', LikeRouter);
    return this.router;
  }
}

export default new Routes().routes();
