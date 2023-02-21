import { Repository } from 'typeorm';
import { Like } from '../entity/like.entity';
import connectionOptions from '../../../database/type-orm.config';
import { Bookmark } from '../../bookmark/entity/bookmark.entity';

export default class FeedLikeRepository {
  private feedLikeRepository: Repository<Like>;

  constructor() {
    this.feedLikeRepository = connectionOptions.getRepository(Like);
  }

  /**
   * 피드 좋아요 조회
   */
  public async findOneLikeByFeed(userId: number, feedId: number): Promise<Like | null> {
    return await this.feedLikeRepository.findOne({ where: { userId, feedId } });
  }

  /**
   * 피드 좋아요
   */
  public async createLikeByFeed(userId: number, feedId: number): Promise<Like> {
    const createLike = await this.feedLikeRepository.create({
      userId,
      feedId,
    });

    return await this.feedLikeRepository.save(createLike);
  }

  /**
   * 피드 좋아요 취소
   */
  public async cancelLikeByFeed(userId: number, feedId: number) {
    return await this.feedLikeRepository.delete({ userId, feedId });
  }
}
