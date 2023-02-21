import LikeService from '../service/like.service';
import LikeController from '../controller/like.controller';
import { Router } from 'express';
import { authCheck } from '../../auth/middlewares/auth-check.middleware';
import { userMiddleware } from '../../auth/middlewares/user.middleware';

class LikeRouter {
  public likeService: LikeService;
  public likeController: LikeController;
  private likeRouter: Router;

  constructor() {
    this.likeService = new LikeService();
    this.likeController = new LikeController(this.likeService);
    this.likeRouter = Router() as Router;
  }

  likeMainRouter(): Router {
    this.likeRouter.post('/beach/:beachId', authCheck, userMiddleware, this.likeController.likeByBeach);
    this.likeRouter.post('/feed/:feedId', authCheck, userMiddleware, this.likeController.likeByFeed);
    this.likeRouter.post('/reply/:replyId', authCheck, userMiddleware, this.likeController.likeByReply);
    return this.likeRouter;
  }
}

export default new LikeRouter().likeMainRouter();
