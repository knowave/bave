import { BeforeUpdate, Column, Entity, JoinColumn, OneToMany, PrimaryColumn } from 'typeorm';
import { BaseEntity } from '../base/base.entity';
import { Like } from './like.entity';
import * as bcrypt from 'bcrypt';
import { Reply } from './reply.entity';
import { Feed } from './feed.entity';

@Entity('users')
export class User extends BaseEntity {
  @PrimaryColumn({
    name: 'user_id',
    comment: '회원 아이디',
  })
  userId?: string;

  @Column('varchar', {
    name: 'password',
    comment: '패스워드',
    nullable: true,
    select: false,
  })
  password?: string;

  @Column('varchar', {
    name: 'username',
    comment: '회원 사용 이름',
    nullable: true,
  })
  username?: string;

  @Column('varchar', {
    name: 'jwt_token',
    comment: 'jwt refresh token',
    nullable: true,
    select: false,
  })
  jwtToken?: string;

  @OneToMany(() => Like, (like) => like.user)
  @JoinColumn({ name: 'like_id', referencedColumnName: 'like_id' })
  likeList?: Like[];

  @OneToMany(() => Reply, (reply) => reply.user)
  @JoinColumn({ name: 'reply_id', referencedColumnName: 'replyId' })
  replyList?: Reply[];

  @OneToMany(() => Feed, (feed) => feed.user)
  feedList?: Feed[];

  async hashPassword(password: string): Promise<void> {
    this.password = await bcrypt.hash(password, 12);
  }

  @BeforeUpdate()
  async updateDate(): Promise<void> {
    this.updatedAt = await new Date();
  }
}
