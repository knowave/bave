import { Repository } from 'typeorm';
import connectionOptions from '../../../database/type-orm.config';
import { Like } from '../entity/like.entity';

export default class ReplyLikeRepository {
  private replyLikeRepository: Repository<Like>;

  constructor() {
    this.replyLikeRepository = connectionOptions.getRepository(Like);
  }

  /**
   * 댓글 좋아요 조회
   */
  public async findOneLikeByReply(userId: number, replyId: number): Promise<Like | null> {
    return await this.replyLikeRepository.findOne({ where: { userId, replyId } });
  }

  /**
   * 댓글 좋아요
   */
  public async createLikeByReply(userId: number, replyId: number): Promise<Like> {
    const createLike = await this.replyLikeRepository.create({
      userId,
      replyId,
    });

    return await this.replyLikeRepository.save(createLike);
  }

  /**
   * 댓글 좋아요 취소
   */
  public async cancelLikeByReply(userId: number, replyId: number) {
    return await this.replyLikeRepository.delete({ userId, replyId });
  }
}
