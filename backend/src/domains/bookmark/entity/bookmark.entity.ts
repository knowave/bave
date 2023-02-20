import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '../../../base/base.entity';
import { Users } from '../../user/entity/user.entity';
import { Feed } from '../../feed/entity/feed.entity';
import { Reply } from '../../reply/entity/reply.entity';
import { Beach } from '../../beach/entity/beach.entity';

@Entity('bookmark')
export class Bookmark extends BaseEntity {
  @PrimaryGeneratedColumn({
    name: 'bookmark_id',
    comment: '좋아요 ID',
  })
  bookmarkId: number;

  @ManyToOne(() => Users, (user) => user.bookmarkList)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'userId' })
  userId: number;

  @ManyToOne(() => Feed, (feed) => feed.bookmarkList)
  @JoinColumn({ name: 'feed_id', referencedColumnName: 'feedId' })
  feedId: number;

  @ManyToOne(() => Reply, (reply) => reply.bookmarkList)
  @JoinColumn({ name: 'reply_id', referencedColumnName: 'replyId' })
  replyId: number;

  @ManyToOne(() => Beach, (beach) => beach.bookmarkList)
  @JoinColumn({ name: 'beach_id', referencedColumnName: 'beachId' })
  beachId: number;
}
