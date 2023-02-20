import { Repository } from 'typeorm';
import { Reply } from '../entity/reply.entity';
import connectionOptions from '../../../database/type-orm.config';
import { query } from 'express';
import { REPLY_EXCEPTION } from '../../../exception/error-code';

export default class ReplyRepository {
  private replyRepository: Repository<Reply>;

  constructor() {
    this.replyRepository = connectionOptions.getRepository(Reply);
  }

  /**
   * 특정 피드의 댓글 조회
   */
  public async getAllReplyByFeed(query: any, feedId: number): Promise<Reply[]> {
    const limit = query.itemPerPage ?? 10;
    const page = query.page ?? 1;
    const skip = limit * (page - 1) ?? 0;
    const replies = await this.replyRepository
      .createQueryBuilder('reply')
      .take(limit)
      .skip(skip)
      .where('reply.feedId = :feedId', { feedId: feedId })
      .innerJoinAndSelect('reply.feedId', 'feed')
      .orderBy('reply.createdAt', 'DESC')
      .getMany();

    if (replies.length === 0) {
      throw REPLY_EXCEPTION.NOT_FOUND_REPLY;
    }

    return replies;
  }

  /**
   * 특정 피드에 댓글 작성
   */
  public async createReplyByFeed(userId: number, feedId: number, contents: string): Promise<Reply> {
    const reply = await this.replyRepository.create({
      userId,
      feedId,
      contents,
    });

    return await this.replyRepository.save(reply);
  }

  /**
   * 특정 피드 댓글 수정
   */
  public async updateReplyByFeed(replyId: number, contents: string) {
    const reply = await this.replyRepository.findOne({ where: { replyId } });

    if (!reply) {
      throw REPLY_EXCEPTION.NOT_FOUND_REPLY;
    }

    return await this.replyRepository.update(reply.replyId, { contents });
  }
}
