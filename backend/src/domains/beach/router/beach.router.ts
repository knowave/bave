import { Router } from 'express';
import BeachRepository from '../repository/beach.repository';
import BeachController from '../controller/beach.controller';

class BeachRouter {
  public beachService: BeachRepository;
  public beachController: BeachController;
  private beachRouter: Router;

  constructor() {
    this.beachRouter = Router() as Router;
    this.beachService = new BeachRepository();
    this.beachController = new BeachController(this.beachService);
  }

  beachMainRouter(): Router {
    this.beachRouter.get('/', this.beachController.getAllBeach);
    this.beachRouter.get('/:beachId', this.beachController.findOneBeach);
    return this.beachRouter;
  }
}

export default new BeachRouter().beachMainRouter();
