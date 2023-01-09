import { BeforeUpdate, Column, Entity, PrimaryColumn } from 'typeorm';
import { BaseEntity } from '../base/base.entity';

@Entity('oath_user', { schema: 'public' })
export class User extends BaseEntity {
  @PrimaryColumn('varchar', {
    name: 'user_id',
    comment: '회원 아이디',
    unique: true,
  })
  userId: string | undefined;

  @Column('varchar', {
    name: 'password',
    comment: '패스워드',
    nullable: true,
    select: false,
  })
  password?: string;
  @Column('varchar', {
    name: 'jwt_token',
    comment: 'jwt refresh token',
    nullable: true,
    select: false,
  })
  jwtToken?: string;
  @Column('varchar', {
    name: 'username',
    comment: '관리자 이름',
    nullable: true,
  })
  username?: string;
  @Column('varchar', {
    name: 'team',
    comment: '소속',
    nullable: true,
  })
  team?: string;
  @Column('varchar', {
    name: 'role_name',
    comment: '역할',
    nullable: false,
    default: '선택',
  })
  roleName?: string;

  @Column('timestamp', {
    name: 'last_access_at',
    comment: '최근 접속일',
    nullable: true,
  })
  lastAccessAt?: Date;

  @BeforeUpdate()
  async updateDate(): Promise<void> {
    this.updatedAt = await new Date();
  }
  //
  // async comparePw(attempt: string): Promise<boolean> {
  //   return await bcrypt.compare(attempt, this.password);
  // }
}
