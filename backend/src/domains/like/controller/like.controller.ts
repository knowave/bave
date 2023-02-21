import LikeService from '../service/like.service';
import { Request, RequestHandler, Response } from 'express';
import { STATUS_CODE } from '../../../exception/status-code';

export default class LikeController {
  constructor(private likeService: LikeService) {}

  /**
   * 해수욕장 좋아요 / 취소
   */
  public likeByBeach: RequestHandler = async (req: Request, res: Response) => {
    const { beachId } = req.params;
    const userId = req.users?.userId;

    try {
      const beach = await this.likeService.findOneLikeByBeach(Number(beachId), Number(beachId));

      if (!beach) {
        await this.likeService.createLikeByBeach(Number(userId), Number(beachId));
        res.status(STATUS_CODE.SUCCESS.CREATED).json({ data: true });
      } else {
        await this.likeService.cancelLikeByBeach(Number(userId), Number(beachId));
        res.status(STATUS_CODE.SUCCESS.OK).json({ data: false });
      }
    } catch (error) {
      console.log('해수욕장 좋아요 / 취소 Error: ', error);
      res.status(STATUS_CODE.ERROR.BAD_REQUEST).send({ errorMessage: error });
    }
  };

  /**
   * 피드 좋아요 / 취소
   */
  public likeByFeed: RequestHandler = async (req: Request, res: Response) => {
    const { feedId } = req.params;
    const userId = req.users?.userId;

    try {
      const feed = await this.likeService.findOneLikeByFeed(Number(userId), Number(feedId));

      if (!feed) {
        await this.likeService.createLikeByFeed(Number(userId), Number(feedId));
        res.status(STATUS_CODE.SUCCESS.CREATED).json({ data: true });
      } else {
        await this.likeService.cancelLikeByFeed(Number(userId), Number(feedId));
        res.status(STATUS_CODE.SUCCESS.OK).json({ data: false });
      }
    } catch (error) {
      console.log('피드 좋아요 / 취소 Error: ', error);
      res.status(STATUS_CODE.ERROR.BAD_REQUEST).send({ errorMessage: error });
    }
  };

  /**
   * 댓글 좋아요 / 취소
   */
  public likeByReply: RequestHandler = async (req: Request, res: Response) => {
    const { replyId } = req.params;
    const userId = req.users?.userId;

    try {
      const reply = await this.likeService.findOneLikeByReply(Number(userId), Number(replyId));

      if (!reply) {
        await this.likeService.createLikeByReply(Number(userId), Number(replyId));
        res.status(STATUS_CODE.SUCCESS.CREATED).json({ data: true });
      } else {
        await this.likeService.cancelLikeByReply(Number(userId), Number(replyId));
        res.status(STATUS_CODE.SUCCESS.OK).json({ json: false });
      }
    } catch (error) {
      console.log('댓글 좋아요 / 취소 Error: ', error);
      res.status(STATUS_CODE.ERROR.BAD_REQUEST).send({ errorMessage: error });
    }
  };
}
