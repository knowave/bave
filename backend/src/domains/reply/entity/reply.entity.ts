import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '../../../base/base.entity';
import { User } from '../../user/entity/user.entity';
import { Feed } from '../../feed/entity/feed.entity';

@Entity()
export class Reply extends BaseEntity {
  @PrimaryGeneratedColumn({
    name: 'reply_id',
    comment: '댓글 ID',
  })
  replyId: number;

  @Column('varchar', {
    name: 'contents',
    comment: '댓글',
    nullable: false,
  })
  contents: string;

  @ManyToOne(() => User, (user) => user.replyList)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'userId' })
  user: User;

  @ManyToOne(() => Feed, (feed) => feed.replyList)
  @JoinColumn({ name: 'feed_id', referencedColumnName: 'feedId' })
  feed: Feed;
}
