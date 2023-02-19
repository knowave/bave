import FeedRepository from '../repository/feed.repository';
import { Beach } from '../../beach/entity/beach.entity';
import { Feed } from '../entity/feed.entity';
import { BEACH_EXCEPTION } from '../../../exception/error-code';

export default class FeedService {
  private feedRepository: FeedRepository;
  constructor() {
    this.feedRepository = new FeedRepository();
  }

  /**
   * 해수욕장 피드 작성
   */
  public async createFeed(beach: Beach, content: string, image?: string): Promise<Feed> {
    if (!beach) throw BEACH_EXCEPTION.NOT_FOUND_BEACH;

    return await this.feedRepository.createFeedByBeachId(beach, content, image);
  }
}
