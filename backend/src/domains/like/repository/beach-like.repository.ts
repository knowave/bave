import { Repository } from 'typeorm';
import { Like } from '../entity/like.entity';
import connectionOptions from '../../../database/type-orm.config';

export default class BeachLikeRepository {
  private beachLikeRepository: Repository<Like>;

  constructor() {
    this.beachLikeRepository = connectionOptions.getRepository(Like);
  }

  /**
   * 해수욕장 좋아요 조회
   */
  public async findOneLikeByBeach(userId: number, beachId: number): Promise<Like | null> {
    return await this.beachLikeRepository.findOne({ where: { userId, beachId } });
  }
}
