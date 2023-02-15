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
    const { content } = req.body;
    const beach = req.beach as Beach;
    const image = req.file;

    try {
      const feed = await this.feedService.createFeed(beach, content, String(image));
      return res.status(STATUS_CODE.SUCCESS.CREATED).json(feed);
    } catch (error) {
      console.log('해수욕장 피드 생성 ERROR : ', error);
      return res.status(STATUS_CODE.ERROR.BAD_REQUEST);
    }
  };

  /**
   * 이미지 s3 업로드
   */
  public uploadImage: RequestHandler = async (req: Request, res: Response) => {
    if (!req.file) {
      return res.status(STATUS_CODE.ERROR.BAD_REQUEST).send({ errorMessage: '업로드할 이미지가 없습니다.' });
    }

    const file: Express.Multer.File = req.file;

    try {
      res.status(STATUS_CODE.SUCCESS.CREATED).json({ file: file });
    } catch (error) {
      console.log(error);
      res.status(STATUS_CODE.SERVER_ERROR.BAD_GATEAWAY).send({ errorMessage: error });
    }
  };
}
