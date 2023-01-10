import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { BaseEntity } from '../base/base.entity';
import { User } from './user.entity';

@Entity()
export class Reply extends BaseEntity {
  @PrimaryColumn('integer', {
    name: 'reply_id',
    comment: '댓글 ID',
  })
  replyId?: number;

  @Column('varchar', {
    name: 'contents',
    comment: '댓글',
    nullable: false,
  })
  contents?: string;

  @ManyToOne(() => User, (user) => user.replyList)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'userId' })
  user?: User;
}
