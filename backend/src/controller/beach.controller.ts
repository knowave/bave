import BeachService from '../service/beach.service';
import { Request, RequestHandler, Response } from 'express';
import { STATUS_CODE } from '../exception/status-code';

export default class BeachController {
  private beachService: BeachService;

  constructor(beachService: BeachService) {
    this.beachService = beachService;
  }

  public getAllBeach: RequestHandler = async (req: Request, res: Response) => {
    const query = req.query;
    try {
      const data = await this.beachService.getAllBeach(query);
      return res.status(STATUS_CODE.SUCCESS.OK).json(data);
    } catch (error) {
      console.error('getAllBeach Error : ', error);
      return res.status(STATUS_CODE.ERROR.BAD_REQUEST).send(error);
    }
  };
}
