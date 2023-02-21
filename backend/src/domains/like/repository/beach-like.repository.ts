import { Repository } from 'typeorm';
import connectionOptions from '../../../database/type-orm.config';
import { Like } from '../entity/like.entity';

export default class ReplyLikeRepository {
  private beachLikeRepository: Repository<Like>;

  constructor() {
    this.beachLikeRepository = connectionOptions.getRepository(Like);
  }

  /**
   * 해수욕장 좋아요 조회
   */
  public async findOneLikeByFeed(userId: number, beachId: number): Promise<Like | null> {
    return await this.beachLikeRepository.findOne({ where: { userId, beachId } });
  }

  /**
   * 해수욕장 좋아요
   */
  public async createLikeByFeed(userId: number, beachId: number): Promise<Like> {
    const createLike = await this.beachLikeRepository.create({
      userId,
      beachId,
    });

    return await this.beachLikeRepository.save(createLike);
  }

  /**
   * 해수욕장 좋아요 취소
   */
  public async cancelLikeByFeed(userId: number, beachId: number) {
    return await this.beachLikeRepository.delete({ userId, beachId });
  }
}
