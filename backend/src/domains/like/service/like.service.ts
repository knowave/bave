import FeedLikeRepository from '../repository/feed-like.repository';
import { Like } from '../entity/like.entity';
import BeachLikeRepository from '../repository/beach-like.repository';
import ReplyLikeRepository from '../repository/reply-like.repository';

export default class LikeService {
  private beachLikeRepository: BeachLikeRepository;
  private feedLikeRepository: FeedLikeRepository;
  private replyLikeRepository: ReplyLikeRepository;

  constructor() {
    this.beachLikeRepository = new BeachLikeRepository();
    this.feedLikeRepository = new FeedLikeRepository();
    this.replyLikeRepository = new ReplyLikeRepository();
  }

  /**
   * 해수욕장 좋아요 조회
   */
  public async findOneLikeByBeach(userId: number, replyId: number): Promise<Like | null> {
    return await this.beachLikeRepository.findOneLikeByBeach(userId, replyId);
  }

  /**
   * 해수욕장 좋아요
   */
  public async createLikeByBeach(userId: number, replyId: number): Promise<Like | null> {
    return await this.beachLikeRepository.createLikeByBeach(userId, replyId);
  }

  /**
   * 해수욕장 좋아요 취소
   */
  public async cancelLikeByBeach(userId: number, replyId: number) {
    return await this.beachLikeRepository.cancelLikeByBeach(userId, replyId);
  }

  /**
   * 피드 좋아요 조회
   */
  public async findOneLikeByFeed(userId: number, replyId: number): Promise<Like | null> {
    return await this.feedLikeRepository.findOneLikeByFeed(userId, replyId);
  }

  /**
   * 피드 좋아요
   */
  public async createLikeByFeed(userId: number, replyId: number): Promise<Like> {
    return await this.feedLikeRepository.createLikeByFeed(userId, replyId);
  }

  /**
   * 피드 좋아요 취소
   */
  public async cancelLikeByFeed(userId: number, replyId: number) {
    return await this.feedLikeRepository.cancelLikeByFeed(userId, replyId);
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
}
