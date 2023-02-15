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
    this.feedRouter.post('/', upload.array('images', 5), this.feedController.createFeed);
    this.feedRouter.post('/upload', authCheck, upload.array('images', 5), this.feedController.uploadImage);
    return this.feedRouter;
  }
}

export default new FeedRouter().feedMainRouter();
