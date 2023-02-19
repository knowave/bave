import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '../../../base/base.entity';
import { Users } from '../../user/entity/user.entity';
import { Reply } from '../../reply/entity/reply.entity';
import { Like } from '../../like/entity/like.entity';
import { Beach } from '../../beach/entity/beach.entity';

@Entity()
export class Feed extends BaseEntity {
  @PrimaryGeneratedColumn({
    name: 'feed_id',
    comment: '피드 ID',
  })
  feedId: number;

  @Column('varchar', {
    name: 'content',
    comment: '피드 글',
    nullable: false,
  })
  content: string;

  @Column('longtext', {
    name: 'feed_image',
    comment: 'feed image',
    nullable: true,
  })
  image!: string | null;

  @ManyToOne(() => Users, (user) => user.feedList)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'userId' })
  user: Users;

  @ManyToOne(() => Beach, (beach) => beach.feedList)
  @JoinColumn({ name: 'beach_id', referencedColumnName: 'beachId' })
  beachId: number;

  @OneToMany(() => Reply, (reply) => reply.feed)
  @JoinColumn({ name: 'reply_id', referencedColumnName: 'replyId' })
  replyList: Reply[];

  @OneToMany(() => Like, (like) => like.feed)
  @JoinColumn({ name: 'like_id', referencedColumnName: 'likeId' })
  likeList: Like[];
}
