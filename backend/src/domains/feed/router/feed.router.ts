import FeedService from '../service/feed.service';
import FeedController from '../controller/feed.controller';
import { Router } from 'express';

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
    this.feedRouter.post('/', this.feedController.createFeed);
    return this.feedRouter;
  }
}

export default new FeedRouter().feedMainRouter();
