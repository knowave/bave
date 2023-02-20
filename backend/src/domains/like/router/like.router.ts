import FeedLikeService from '../service/feed-like.service';
import LikeController from '../controller/like.controller';
import { Router } from 'express';
import { authCheck } from '../../auth/middlewares/auth-check.middleware';
import { userMiddleware } from '../../auth/middlewares/user.middleware';

class LikeRouter {
  public feedLikeService: FeedLikeService;
  public likeController: LikeController;
  private likeRouter: Router;

  constructor() {
    this.feedLikeService = new FeedLikeService();
    this.likeController = new LikeController(this.feedLikeService);
    this.likeRouter = Router() as Router;
  }

  likeMainRouter(): Router {
    this.likeRouter.post('/feed/:feedId', authCheck, userMiddleware, this.likeController.likeByFeed);
    return this.likeRouter;
  }
}

export default new LikeRouter().likeMainRouter();
