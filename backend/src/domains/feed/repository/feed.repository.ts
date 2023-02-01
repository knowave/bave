import { Repository } from 'typeorm';
import { Feed } from '../entity/feed.entity';
import connectionOptions from '../../../database/type-orm.config';

export default class FeedRepository {
  private feedRepository: Repository<Feed>;

  constructor() {
    this.feedRepository = connectionOptions.getRepository(Feed);
  }

  /**
   * 피드 작성
   */
  public async createFeedByBeachId(content: string): Promise<Feed> {
    const feed = await this.feedRepository.create({ content });

    return await this.feedRepository.save(feed);
  }
}
