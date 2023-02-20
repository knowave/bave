import ReplyService from '../service/reply.service';
import ReplyController from '../controller/reply.controller';
import { Router } from 'express';

class ReplyRouter {
  private replyService: ReplyService;
  private replyController: ReplyController;
  private replyRouter: Router;

  constructor() {
    this.replyService = new ReplyService();
    this.replyController = new ReplyController(this.replyService);
    this.replyRouter = Router() as Router;
  }

  replyMainRouter(): Router {
    this.replyRouter.get('/:feedId', this.replyController.getAllReplyByFeed);
    return this.replyRouter;
  }
}

export default new ReplyRouter().replyMainRouter();
