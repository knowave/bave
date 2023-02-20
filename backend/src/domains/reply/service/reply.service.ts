import ReplyRepository from '../repository/reply.repository';
import FeedRepository from '../../feed/repository/feed.repository';
import { Reply } from '../entity/reply.entity';
import UserRepository from '../../user/repository/user.repository';

export default class ReplyService {
  private replyRepository: ReplyRepository;
  private feedRepository: FeedRepository;
  private userRepository: UserRepository;

  constructor() {
    this.replyRepository = new ReplyRepository();
    this.feedRepository = new FeedRepository();
    this.userRepository = new UserRepository();
  }

  /**
   * 특정 피드의 댓글 조회
   */
  public async getAllReplyByFeed(query: any, feedId: number): Promise<Reply[]> {
    const feed = await this.feedRepository.findOneByFeed(feedId);
    return this.replyRepository.getAllReplyByFeed(query, feed.feedId);
  }

  /**
   * 특정 피드에 댓글 작성
   */
  public async createReplyByFeed(userId: number, feedId: number, contents: string): Promise<Reply> {
    const user = await this.userRepository.findOneByUser(userId);
    const feed = await this.feedRepository.findOneByFeed(feedId);

    return this.replyRepository.createReplyByFeed(user.userId, feed.feedId, contents);
  }

  /**
   * 특정 피드 댓글 수정
   */
  public async updateReplyByFeed(replyId: number, contents: string) {
    return await this.replyRepository.updateReplyByFeed(replyId, contents);
  }
}
