import { Router } from 'express';
import BeachController from '../controller/beach.controller';
import BeachService from '../service/beach.service';

class BeachRouter {
  public beachService: BeachService;
  public beachController: BeachController;
  private beachRouter: Router;

  constructor() {
    this.beachRouter = Router() as Router;
    this.beachService = new BeachService();
    this.beachController = new BeachController(this.beachService);
  }

  beachMainRouter(): Router {
    this.beachRouter.get('/', this.beachController.getAllBeach);
    this.beachRouter.get('/:beachId', this.beachController.findOneBeach);
    return this.beachRouter;
  }
}

export default new BeachRouter().beachMainRouter();
