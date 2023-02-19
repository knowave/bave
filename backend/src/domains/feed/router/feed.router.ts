import FeedService from '../service/feed.service';
import FeedController from '../controller/feed.controller';
import { Router } from 'express';
import { upload } from '../middleware/upload.middleware';
import { authCheck } from '../../auth/middlewares/auth-check.middleware';

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
    this.feedRouter.post('/', authCheck, upload.array('images', 5), this.feedController.createFeed);
    return this.feedRouter;
  }
}

export default new FeedRouter().feedMainRouter();
