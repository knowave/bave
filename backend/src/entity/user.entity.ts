import { BeforeUpdate, Column, Entity, JoinColumn, OneToMany, PrimaryColumn } from 'typeorm';
import { BaseEntity } from '../base/base.entity';
import { Like } from './like.entity';
import * as bcrypt from 'bcrypt';

@Entity('users')
export class User extends BaseEntity {
  @PrimaryColumn('varchar', {
    name: 'user_id',
    comment: '회원 아이디',
    unique: true,
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

  async hashPassword(password: string): Promise<void> {
    this.password = await bcrypt.hash(password, 12);
  }

  @BeforeUpdate()
  async updateDate(): Promise<void> {
    this.updatedAt = await new Date();
  }
}
