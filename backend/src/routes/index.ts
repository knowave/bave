import { Request, Response } from 'express';

class Routes {
  private controller: any;

  constructor() {
    this.controller = '';
  }

  public routes(app: any): void {
    app.route('/').get((req: Request, res: Response) => {
      res.status(200).send({
        message: 'GET Request successfully.',
      });
    });
  }
}
