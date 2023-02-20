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

  /**
   * 특정 피드에 댓글 작성
   */
  public createReplyByFeed: RequestHandler = async (req: Request, res: Response) => {
    const { userId, feedId } = req.params;
    const { contents } = req.body;

    try {
      const reply = await this.replyService.createReplyByFeed(Number(userId), Number(feedId), contents);
      res.status(STATUS_CODE.SUCCESS.CREATED).json({ data: reply });
    } catch (error) {
      console.log('특정 피드에 댓글 작성 Error: ', error);
      res.status(STATUS_CODE.ERROR.BAD_REQUEST).send({ errorMessage: error });
    }
  };

  /**
   * 특정 피드 댓글 수정
   */
  public updateReplyByFeed: RequestHandler = async (req: Request, res: Response) => {
    const { replyId } = req.params;
    const { contents } = req.body;

    try {
      const reply = await this.replyService.updateReplyByFeed(Number(replyId), contents);
      res.status(STATUS_CODE.SUCCESS.OK).json({ data: reply });
    } catch (error) {
      console.log('특정 피드 댓글 수정 Error: ', error);
      res.status(STATUS_CODE.ERROR.BAD_REQUEST).send({ errorMessage: error });
    }
  };

  /**
   * 특정 피드 댓글 삭제
   */
  public deleteReplyByFeed: RequestHandler = async (req: Request, res: Response) => {
    const { replyId } = req.params;

    try {
      const reply = await this.replyService.deleteReplyByFeed(Number(replyId));
      res.status(STATUS_CODE.SUCCESS.OK).json({ data: reply });
    } catch (error) {
      console.log('특정 피드 댓글 삭제 Error: ', error);
      res.status(STATUS_CODE.ERROR.BAD_REQUEST).send({ errorMessage: error });
    }
  };
}
