import FeedLikeService from '../service/feed-like.service';
import { Request, RequestHandler, Response } from 'express';
import { STATUS_CODE } from '../../../exception/status-code';

export default class LikeController {
  constructor(private feedLikeService: FeedLikeService) {}

  /**
   * 피드 좋아요 / 취소
   */
  public likeByFeed: RequestHandler = async (req: Request, res: Response) => {
    const { feedId } = req.params;
    const userId = req.users?.userId;

    try {
      const like = await this.feedLikeService.findOneByLike(Number(userId), Number(feedId));

      if (!like) {
        await this.feedLikeService.createLikeByFeed(Number(userId), Number(feedId));
        res.status(STATUS_CODE.SUCCESS.CREATED).json({ data: true });
      } else {
        await this.feedLikeService.cancelLikeByFeed(Number(userId), Number(feedId));
        res.status(STATUS_CODE.SUCCESS.OK).json({ data: false });
      }
    } catch (error) {
      console.log('피드 좋아요 / 취소 Error: ', error);
      res.status(STATUS_CODE.ERROR.BAD_REQUEST).send({ errorMessage: error });
    }
  };
}
