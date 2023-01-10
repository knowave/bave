import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { BaseEntity } from '../base/base.entity';
import { User } from './user.entity';

@Entity('like')
export class Like extends BaseEntity {
  @PrimaryColumn('integer', {
    name: 'like_id',
    comment: '좋아요 ID',
  })
  likeId?: number;

  @ManyToOne(() => User, (user) => user.likeList)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'userId' })
  user?: User;
}
