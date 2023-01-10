import { BeforeUpdate, Column, Entity, PrimaryColumn } from 'typeorm';
import { BaseEntity } from '../base/base.entity';

@Entity('users', { schema: 'public' })
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

  @BeforeUpdate()
  async updateDate(): Promise<void> {
    this.updatedAt = await new Date();
  }
  //
  // async comparePw(attempt: string): Promise<boolean> {
  //   return await bcrypt.compare(attempt, this.password);
  // }
}
