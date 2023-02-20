import { BeforeUpdate, Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '../../../base/base.entity';
import { Bookmark } from '../../bookmark/entity/bookmark.entity';
import * as bcrypt from 'bcrypt';
import { Reply } from '../../reply/entity/reply.entity';
import { Feed } from '../../feed/entity/feed.entity';

@Entity('users')
export class Users extends BaseEntity {
  @PrimaryGeneratedColumn({
    name: 'user_id',
    comment: '회원 아이디',
  })
  userId: number;

  @Column('varchar', {
    name: 'email',
    comment: '회원 이메일',
    nullable: false,
    unique: true,
  })
  email: string;

  @Column('varchar', {
    name: 'password',
    comment: '패스워드',
    nullable: false,
    select: false,
  })
  password: string;

  @Column('varchar', {
    name: 'username',
    comment: '회원 사용 이름',
    nullable: false,
  })
  username: string;

  @Column('longtext', {
    name: 'jwt_token',
    comment: 'jwt refresh token',
    nullable: true,
    select: false,
  })
  jwtToken!: string | null;

  @OneToMany(() => Bookmark, (like) => like.userId)
  @JoinColumn({ name: 'like_id', referencedColumnName: 'like_id' })
  bookmarkList: Bookmark[];

  @OneToMany(() => Reply, (reply) => reply.userId)
  @JoinColumn({ name: 'reply_id', referencedColumnName: 'replyId' })
  replyList: Reply[];

  @OneToMany(() => Feed, (feed) => feed.userId)
  feedList: Feed[];

  async hashPassword(password: string): Promise<void> {
    this.password = await bcrypt.hash(password, 12);
  }

  @BeforeUpdate()
  async updateDate(): Promise<void> {
    this.updatedAt = await new Date();
  }
}
