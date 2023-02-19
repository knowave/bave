import { Repository } from 'typeorm';
import { Feed } from '../entity/feed.entity';
import connectionOptions from '../../../database/type-orm.config';
import { Beach } from '../../beach/entity/beach.entity';

export default class FeedRepository {
  private feedRepository: Repository<Feed>;
  private beachRepository: Repository<Beach>;

  constructor() {
    this.feedRepository = connectionOptions.getRepository(Feed);
    this.beachRepository = connectionOptions.getRepository(Beach);
  }

  /**
   * 피드 작성
   */
  public async createFeedByBeachId(beach: Beach, content: string, image?: string): Promise<Feed> {
    const feed = this.feedRepository.create({
      content,
      beach,
      image,
    });

    return await this.feedRepository.save(feed);
  }
}
