import { Repository } from 'typeorm';
import { Bookmark } from '../entity/bookmark.entity';
import connectionOptions from '../../../database/type-orm.config';

export default class FeedBookmarkRepository {
  private feedLikeRepository: Repository<Bookmark>;

  constructor() {
    this.feedLikeRepository = connectionOptions.getRepository(Bookmark);
  }

  /**
   * 피드 좋아요 조회
   */
  public async findOneBookmarkByFeed(userId: number, feedId: number): Promise<Bookmark | null> {
    return await this.feedLikeRepository.findOne({ where: { userId, feedId } });
  }

  /**
   * 피드 좋아요
   */
  public async createBookmarkByFeed(userId: number, feedId: number): Promise<Bookmark> {
    const createLike = await this.feedLikeRepository.create({
      userId,
      feedId,
    });

    return await this.feedLikeRepository.save(createLike);
  }

  /**
   * 피드 좋아요 취소
   */
  public async cancelBookmarkByFeed(userId: number, feedId: number) {
    return await this.feedLikeRepository.delete({ userId, feedId });
  }
}
