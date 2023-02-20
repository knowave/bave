import FeedBookmarkRepository from '../repository/feed-bookmark.repository';
import { Bookmark } from '../entity/bookmark.entity';
import ReplyBookmarkRepository from '../repository/reply-bookmark.repository';
import BeachBookmarkRepository from '../repository/beach-bookmark.repository';

export default class BookmarkService {
  private feedBookmarkRepository: FeedBookmarkRepository;
  private replyBookmarkRepository: ReplyBookmarkRepository;
  private beachBookmarkRepository: BeachBookmarkRepository;

  constructor() {
    this.feedBookmarkRepository = new FeedBookmarkRepository();
    this.replyBookmarkRepository = new ReplyBookmarkRepository();
    this.beachBookmarkRepository = new BeachBookmarkRepository();
  }

  /**
   * 피드 좋아요 조회
   */
  public async findOneByBookmark(userId: number, feedId: number): Promise<Bookmark | null> {
    return await this.feedBookmarkRepository.findOneBookmarkByFeed(userId, feedId);
  }

  /**
   * 피드 좋아요
   */
  public async createBookmarkByFeed(userId: number, feedId: number): Promise<Bookmark> {
    return await this.feedBookmarkRepository.createBookmarkByFeed(userId, feedId);
  }

  /**
   * 피드 좋아요 취소
   */
  public async cancelBookmarkByFeed(userId: number, feedId: number) {
    return await this.feedBookmarkRepository.cancelBookmarkByFeed(userId, feedId);
  }

  /**
   * 댓글 좋아요 조회
   */
  public async findOneBookmarkByReply(userId: number, replyId: number): Promise<Bookmark | null> {
    return await this.replyBookmarkRepository.findOneBookmarkByReply(userId, replyId);
  }

  /**
   * 댓글 좋아요
   */
  public async createBookmarkByReply(userId: number, replyId: number): Promise<Bookmark> {
    return await this.replyBookmarkRepository.createBookmarkByReply(userId, replyId);
  }

  /**
   * 댓글 좋아요 취소
   */
  public async cancelBookmarkByReply(userId: number, replyId: number) {
    return await this.replyBookmarkRepository.cancelBookmarkByReply(userId, replyId);
  }

  /**
   * 해수욕장 좋아요 조회
   */
  public async findOneBookmarkByBeach(userId: number, beachId: number): Promise<Bookmark | null> {
    return await this.beachBookmarkRepository.findOneBookmarkByBeach(userId, beachId);
  }

  /**
   * 해수욕장 좋아요
   */
  public async createBookmarkByBeach(userId: number, beachId: number): Promise<Bookmark> {
    return await this.beachBookmarkRepository.createBookmarkByBeach(userId, beachId);
  }

  /**
   * 해수욕장 좋아요 취소
   */
  public async cancelBookmarkByBeach(userId: number, beachId: number) {
    return await this.beachBookmarkRepository.cancelBookmarkByBeach(userId, beachId);
  }
}
