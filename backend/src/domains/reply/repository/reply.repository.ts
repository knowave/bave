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
}
