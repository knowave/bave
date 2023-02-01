import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '../base/base.entity';
import { User } from './user.entity';
import { Feed } from './feed.entity';

@Entity('like')
export class Like extends BaseEntity {
  @PrimaryGeneratedColumn({
    name: 'like_id',
    comment: '좋아요 ID',
  })
  likeId: number;

  @ManyToOne(() => User, (user) => user.likeList)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'userId' })
  user: User;

  @ManyToOne(() => Feed, (feed) => feed.likeList)
  @JoinColumn({ name: 'feed_id', referencedColumnName: 'feedId' })
  feed: Feed;
}
