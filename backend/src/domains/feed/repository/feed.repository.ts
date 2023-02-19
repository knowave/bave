import { Repository } from 'typeorm';
import { Feed } from '../entity/feed.entity';
import connectionOptions from '../../../database/type-orm.config';
import { Beach } from '../../beach/entity/beach.entity';

export default class FeedRepository {
  private feedRepository: Repository<Feed>;

  constructor() {
    this.feedRepository = connectionOptions.getRepository(Feed);
  }

  /**
   * 피드 작성
   */
  public async createFeedByBeachId(beachId: number, content: string, image?: string): Promise<Feed> {
    const feed = this.feedRepository.create({
      content,
      beachId,
      image,
    });

    return await this.feedRepository.save(feed);
  }
}
