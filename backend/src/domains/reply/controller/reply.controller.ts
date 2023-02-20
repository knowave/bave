import ReplyService from '../service/reply.service';
import { Request, RequestHandler, Response } from 'express';
import { STATUS_CODE } from '../../../exception/status-code';

export default class ReplyController {
  constructor(private replyService: ReplyService) {}

  /**
   * 특정 피드의 댓글 조회
   */
  public getAllReplyByFeed: RequestHandler = async (req: Request, res: Response) => {
    const query = req.query;
    const { feedId } = req.params;
    try {
      const data = await this.replyService.getAllReplyByFeed(query, Number(feedId));
      return res.status(STATUS_CODE.SUCCESS.OK).json(data);
    } catch (error) {
      console.log('특정 피드의 댓글 조회 Error: ', error);
      return res.status(STATUS_CODE.ERROR.BAD_REQUEST).send({ errorMessage: error });
    }
  };
}
