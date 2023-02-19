import { Repository } from 'typeorm';
import { Feed } from '../entity/feed.entity';
import connectionOptions from '../../../database/type-orm.config';
import { Beach } from '../../beach/entity/beach.entity';
import { FEED_EXCEPTION } from '../../../exception/error-code';

export default class FeedRepository {
  private feedRepository: Repository<Feed>;

  constructor() {
    this.feedRepository = connectionOptions.getRepository(Feed);
  }

  /**
   * 해수욕장 피드 전체 조회
   */
  public async getAllFeed(query: any, beachId: number): Promise<Feed[]> {
    const limit = query.itemPerPage ?? 10;
    const page = query.page ?? 1;
    const skip = limit * (page - 1) ?? 0;
    const feeds = await this.feedRepository
      .createQueryBuilder('feed')
      .take(limit)
      .skip(skip)
      .where('feed.beachId = :beachId', { beachId: beachId })
      .innerJoinAndSelect('feed.beachId', 'beach')
      .orderBy('feed.createdAt', 'DESC')
      .getMany();

    if (feeds.length === 0) {
      throw FEED_EXCEPTION.NOT_FOUND_FEEDS;
    }

    return feeds;
  }

  /**
   * 특정 피드 조회
   */
  public async findOneByFeed(feedId: number): Promise<Feed> {
    const feed = await this.feedRepository.findOne({ where: { feedId } });

    if (!feed) {
      throw FEED_EXCEPTION.NOT_FOUND_FEED;
    }

    return feed;
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
