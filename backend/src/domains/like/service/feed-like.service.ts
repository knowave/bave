import FeedLikeRepository from '../repository/feed-like.repository';
import { Like } from '../entity/like.entity';

export default class FeedLikeService {
  private likeRepository: FeedLikeRepository;

  constructor() {
    this.likeRepository = new FeedLikeRepository();
  }

  /**
   * 피드 좋아요 조회
   */
  public async findOneByLike(userId: number, feedId: number): Promise<Like | null> {
    return await this.likeRepository.findOneByLike(userId, feedId);
  }

  /**
   * 피드 좋아요
   */
  public async createLikeByFeed(userId: number, feedId: number): Promise<Like> {
    return await this.likeRepository.createLikeByFeed(userId, feedId);
  }

  /**
   * 피드 좋아요 취소
   */
  public async cancelLikeByFeed(userId: number, feedId: number) {
    return await this.likeRepository.cancelLikeByFeed(userId, feedId);
  }
}
