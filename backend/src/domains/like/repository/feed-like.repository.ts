import { Repository } from 'typeorm';
import { Like } from '../entity/like.entity';
import connectionOptions from '../../../database/type-orm.config';

export default class FeedLikeRepository {
  private likeRepository: Repository<Like>;

  constructor() {
    this.likeRepository = connectionOptions.getRepository(Like);
  }

  /**
   * 피드 좋아요 조회
   */
  public async findOneByLike(userId: number, feedId: number): Promise<Like | null> {
    return await this.likeRepository.findOne({ where: { userId, feedId } });
  }

  /**
   * 피드 좋아요
   */
  public async createLikeByFeed(userId: number, feedId: number): Promise<Like> {
    const createLike = await this.likeRepository.create({
      userId,
      feedId,
    });

    return await this.likeRepository.save(createLike);
  }

  /**
   * 피드 좋아요 취소
   */
  public async cancelLikeByFeed(userId: number, feedId: number) {
    return await this.likeRepository.delete({ userId, feedId });
  }
}
