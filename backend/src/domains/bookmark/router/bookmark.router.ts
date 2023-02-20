import BookmarkService from '../service/bookmark.service';
import BookmarkController from '../controller/bookmark.controller';
import { Router } from 'express';
import { authCheck } from '../../auth/middlewares/auth-check.middleware';
import { userMiddleware } from '../../auth/middlewares/user.middleware';

class BookmarkRouter {
  public bookmarkService: BookmarkService;
  public bookmarkController: BookmarkController;
  private bookmarkRouter: Router;

  constructor() {
    this.bookmarkService = new BookmarkService();
    this.bookmarkController = new BookmarkController(this.bookmarkService);
    this.bookmarkRouter = Router() as Router;
  }

  bookmarkMainRouter(): Router {
    this.bookmarkRouter.post('/feed/:feedId', authCheck, userMiddleware, this.bookmarkController.bookmarkByFeed);
    this.bookmarkRouter.post('/beach/:beachId', authCheck, userMiddleware, this.bookmarkController.bookmarkByBeach);
    return this.bookmarkRouter;
  }
}

export default new BookmarkRouter().bookmarkMainRouter();
