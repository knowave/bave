import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '../../../base/base.entity';
import { Users } from '../../user/entity/user.entity';
import { Feed } from '../../feed/entity/feed.entity';
import { Reply } from '../../reply/entity/reply.entity';

@Entity('like')
export class Like extends BaseEntity {
  @PrimaryGeneratedColumn({
    name: 'like_id',
    comment: '좋아요 ID',
  })
  likeId: number;

  @ManyToOne(() => Users, (user) => user.likeList)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'userId' })
  userId: number;

  @ManyToOne(() => Feed, (feed) => feed.likeList)
  @JoinColumn({ name: 'feed_id', referencedColumnName: 'feedId' })
  feedId: number;

  @ManyToOne(() => Reply, (reply) => reply.likeList)
  @JoinColumn({ name: 'reply_id', referencedColumnName: 'replyId' })
  replyId: number;
}
