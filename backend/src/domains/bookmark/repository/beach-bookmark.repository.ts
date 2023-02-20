import { Repository } from 'typeorm';
import { Bookmark } from '../entity/bookmark.entity';
import connectionOptions from '../../../database/type-orm.config';

export default class BeachBookmarkRepository {
  private beachLikeRepository: Repository<Bookmark>;

  constructor() {
    this.beachLikeRepository = connectionOptions.getRepository(Bookmark);
  }

  /**
   * 해수욕장 북마크 조회
   */
  public async findOneBookmarkByBeach(userId: number, beachId: number): Promise<Bookmark | null> {
    return await this.beachLikeRepository.findOne({ where: { userId, beachId } });
  }

  /**
   * 해수욕장 북마크
   */
  public async createBookmarkByBeach(userId: number, beachId: number): Promise<Bookmark> {
    const createLike = await this.beachLikeRepository.create({
      userId,
      beachId,
    });

    return await this.beachLikeRepository.save(createLike);
  }

  /**
   * 해수욕장 북마크 취소
   */
  public async cancelBookmarkByBeach(userId: number, beachId: number) {
    return await this.beachLikeRepository.delete({ userId, beachId });
  }
}
