import { Request, RequestHandler, Response } from 'express';
import { STATUS_CODE } from '../../../exception/status-code';
import BeachService from '../service/beach.service';

export default class BeachController {
  constructor(private beachService: BeachService) {}

  /**
   * 해수욕장 전체 조회
   */
  public getAllBeach: RequestHandler = async (req: Request, res: Response) => {
    const query = req.query;
    try {
      const data = await this.beachService.getAllBeach(query);
      return res.status(STATUS_CODE.SUCCESS.OK).json(data);
    } catch (error) {
      console.log('해수욕장 전체 조회 Error : ', error);
      return res.status(STATUS_CODE.ERROR.BAD_REQUEST).send(error);
    }
  };

  /**
   * 특정 해수욕장 조회
   */
  public findOneBeach: RequestHandler = async (req: Request, res: Response) => {
    const { beachId } = req.params;
    try {
      const beach = await this.beachService.findOneByBeach(Number(beachId));
      return res.status(STATUS_CODE.SUCCESS.OK).json(beach);
    } catch (error) {
      console.log('특정 해수욕장 ERROR :', error);
      return res.status(STATUS_CODE.ERROR.BAD_REQUEST).send(error);
    }
  };
}
