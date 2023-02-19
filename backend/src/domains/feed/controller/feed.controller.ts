import FeedService from '../service/feed.service';
import { Request, RequestHandler, Response } from 'express';
import { STATUS_CODE } from '../../../exception/status-code';
import { Beach } from '../../beach/entity/beach.entity';

export default class FeedController {
  constructor(private feedService: FeedService) {}

  /**
   * 피드 생성
   */
  public createFeed: RequestHandler = async (req: Request, res: Response) => {
    const imageFile = req.file?.filename;
    const { content } = req.body;
    const beach = req.beach as Beach;

    try {
      const feed = await this.feedService.createFeed(beach, content, imageFile);
      res.status(STATUS_CODE.SUCCESS.CREATED).json({ file: feed });
    } catch (error) {
      console.log(error);
      res.status(STATUS_CODE.ERROR.BAD_REQUEST).send({ errorMessage: error });
    }
  };
}
