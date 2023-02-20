import { Repository } from 'typeorm';
import { Bookmark } from '../entity/bookmark.entity';
import connectionOptions from '../../../database/type-orm.config';

export default class ReplyBookmarkRepository {
  private replyRepository: Repository<Bookmark>;

  constructor() {
    this.replyRepository = connectionOptions.getRepository(Bookmark);
  }

  /**
   * 댓글 좋아요 조회
   */
  public async findOneBookmarkByReply(userId: number, replyId: number): Promise<Bookmark | null> {
    return await this.replyRepository.findOne({ where: { userId, replyId } });
  }

  /**
   * 댓글 좋아요
   */
  public async createBookmarkByReply(userId: number, replyId: number): Promise<Bookmark> {
    const createLike = await this.replyRepository.create({
      userId,
      replyId,
    });

    return await this.replyRepository.save(createLike);
  }

  /**
   * 댓글 좋아요 취소
   */
  public async cancelBookmarkByReply(userId: number, replyId: number) {
    return await this.replyRepository.delete({ userId, replyId });
  }
}
