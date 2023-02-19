import FeedRepository from '../repository/feed.repository';
import { Beach } from '../../beach/entity/beach.entity';
import { Feed } from '../entity/feed.entity';
import { BEACH_EXCEPTION } from '../../../exception/error-code';
import BeachRepository from '../../beach/repository/beach.repository';

export default class FeedService {
  private feedRepository: FeedRepository;
  private beachRepository: BeachRepository;
  constructor() {
    this.feedRepository = new FeedRepository();
    this.beachRepository = new BeachRepository();
  }

  /**
   * 해수욕장 피드 전체 조회
   */
  public async getAllFeed(query: any, beachId: number): Promise<Feed[]> {
    return await this.feedRepository.getAllFeed(query, beachId);
  }

  /**
   * 특정 피드 조회
   */
  public async findOneByFeed(feedId: number): Promise<Feed> {
    return await this.feedRepository.findOneByFeed(feedId);
  }

  /**
   * 해수욕장 피드 작성
   */
  public async createFeed(beachId: number, content: string, image?: string): Promise<Feed> {
    const beach = await this.beachRepository.findOneByBeach(beachId);

    return await this.feedRepository.createFeedByBeachId(beach.beachId, content, image);
  }
}
