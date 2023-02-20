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
   * 피드 북마크 조회
   */
  public async findOneByBookmark(userId: number, feedId: number): Promise<Bookmark | null> {
    return await this.feedBookmarkRepository.findOneBookmarkByFeed(userId, feedId);
  }

  /**
   * 피드 북마크
   */
  public async createBookmarkByFeed(userId: number, feedId: number): Promise<Bookmark> {
    return await this.feedBookmarkRepository.createBookmarkByFeed(userId, feedId);
  }

  /**
   * 피드 북마크 취소
   */
  public async cancelBookmarkByFeed(userId: number, feedId: number) {
    return await this.feedBookmarkRepository.cancelBookmarkByFeed(userId, feedId);
  }

  /**
   * 해수욕장 북마크 조회
   */
  public async findOneBookmarkByBeach(userId: number, beachId: number): Promise<Bookmark | null> {
    return await this.beachBookmarkRepository.findOneBookmarkByBeach(userId, beachId);
  }

  /**
   * 해수욕장 북마크
   */
  public async createBookmarkByBeach(userId: number, beachId: number): Promise<Bookmark> {
    return await this.beachBookmarkRepository.createBookmarkByBeach(userId, beachId);
  }

  /**
   * 해수욕장 북마크 취소
   */
  public async cancelBookmarkByBeach(userId: number, beachId: number) {
    return await this.beachBookmarkRepository.cancelBookmarkByBeach(userId, beachId);
  }
}
