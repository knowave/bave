import { Repository } from 'typeorm';
import { Like } from '../entity/like.entity';
import connectionOptions from '../../../database/type-orm.config';

export default class ReplyLikeRepository {
  private replyRepository: Repository<Like>;

  constructor() {
    this.replyRepository = connectionOptions.getRepository(Like);
  }

  /**
   * 댓글 좋아요 조회
   */
  public async findOneLikeByReply(userId: number, replyId: number): Promise<Like | null> {
    return await this.replyRepository.findOne({ where: { userId, replyId } });
  }

  /**
   * 댓글 좋아요
   */
  public async createLikeByReply(userId: number, replyId: number): Promise<Like> {
    const createLike = await this.replyRepository.create({
      userId,
      replyId,
    });

    return await this.replyRepository.save(createLike);
  }

  /**
   * 댓글 좋아요 취소
   */
  public async cancelLikeByReply(userId: number, replyId: number) {
    return await this.replyRepository.delete({ userId, replyId });
  }
}
