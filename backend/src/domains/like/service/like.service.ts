import FeedLikeRepository from '../repository/feed-like.repository';
import { Like } from '../entity/like.entity';
import ReplyLikeRepository from '../repository/reply-like.repository';
import BeachLikeRepository from '../repository/beach-like.repository';

export default class LikeService {
  private feedLikeRepository: FeedLikeRepository;
  private replyLikeRepository: ReplyLikeRepository;
  private beachLikeRepository: BeachLikeRepository;

  constructor() {
    this.feedLikeRepository = new FeedLikeRepository();
    this.replyLikeRepository = new ReplyLikeRepository();
    this.beachLikeRepository = new BeachLikeRepository();
  }

  /**
   * 피드 좋아요 조회
   */
  public async findOneByLike(userId: number, feedId: number): Promise<Like | null> {
    return await this.feedLikeRepository.findOneLikeByFeed(userId, feedId);
  }

  /**
   * 피드 좋아요
   */
  public async createLikeByFeed(userId: number, feedId: number): Promise<Like> {
    return await this.feedLikeRepository.createLikeByFeed(userId, feedId);
  }

  /**
   * 피드 좋아요 취소
   */
  public async cancelLikeByFeed(userId: number, feedId: number) {
    return await this.feedLikeRepository.cancelLikeByFeed(userId, feedId);
  }

  /**
   * 댓글 좋아요 조회
   */
  public async findOneLikeByReply(userId: number, replyId: number): Promise<Like | null> {
    return await this.replyLikeRepository.findOneLikeByReply(userId, replyId);
  }

  /**
   * 댓글 좋아요
   */
  public async createLikeByReply(userId: number, replyId: number): Promise<Like> {
    return await this.replyLikeRepository.createLikeByReply(userId, replyId);
  }

  /**
   * 댓글 좋아요 취소
   */
  public async cancelLikeByReply(userId: number, replyId: number) {
    return await this.replyLikeRepository.cancelLikeByReply(userId, replyId);
  }

  /**
   * 해수욕장 좋아요 조회
   */
  public async findOneLikeByBeach(userId: number, beachId: number): Promise<Like | null> {
    return await this.beachLikeRepository.findOneLikeByBeach(userId, beachId);
  }

  /**
   * 해수욕장 좋아요
   */
  public async createLikeByBeach(userId: number, beachId: number): Promise<Like> {
    return await this.beachLikeRepository.createLikeByBeach(userId, beachId);
  }

  /**
   * 해수욕장 좋아요 취소
   */
  public async cancelLikeByBeach(userId: number, beachId: number) {
    return await this.beachLikeRepository.cancelLikeByBeach(userId, beachId);
  }
}
