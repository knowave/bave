import FeedService from '../service/feed.service';
import FeedController from '../controller/feed.controller';
import { Router } from 'express';
import { upload } from '../middleware/upload.middleware';
import { authCheck } from '../../auth/middlewares/auth-check.middleware';
import { userMiddleware } from '../../auth/middlewares/user.middleware';

class FeedRouter {
  public feedService: FeedService;
  public feedController: FeedController;
  private feedRouter: Router;

  constructor() {
    this.feedRouter = Router() as Router;
    this.feedService = new FeedService();
    this.feedController = new FeedController(this.feedService);
  }

  feedMainRouter(): Router {
    this.feedRouter.get('/:beachId', this.feedController.getAllFeed);
    this.feedRouter.get('/one/:feedId', this.feedController.findOneByFeed);
    this.feedRouter.post('/:userId/:beachId', authCheck, userMiddleware, upload.array('images', 5), this.feedController.createFeed);
    this.feedRouter.patch('/:feedId', authCheck, upload.array('images', 5), this.feedController.updateFeed);
    this.feedRouter.delete('/:feedId', authCheck, this.feedController.deleteFeed);
    return this.feedRouter;
  }
}

export default new FeedRouter().feedMainRouter();
