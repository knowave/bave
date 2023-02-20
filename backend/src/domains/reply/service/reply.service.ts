import ReplyRepository from '../repository/reply.repository';
import FeedRepository from '../../feed/repository/feed.repository';
import { Reply } from '../entity/reply.entity';

export default class ReplyService {
  private replyRepository: ReplyRepository;
  private feedRepository: FeedRepository;

  constructor() {
    this.replyRepository = new ReplyRepository();
    this.feedRepository = new FeedRepository();
  }

  /**
   * 특정 피드의 댓글 조회
   */
  public async getAllReplyByFeed(query: any, feedId: number): Promise<Reply[]> {
    const feed = await this.feedRepository.findOneByFeed(feedId);
    return this.replyRepository.getAllReplyByFeed(query, feed.feedId);
  }
}
