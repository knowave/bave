import { Column, Entity, PrimaryColumn } from 'typeorm';
import { BaseEntity } from '../../../base/base.entity';

@Entity('social_user')
export class SocialUser extends BaseEntity {
  @PrimaryColumn('varchar', {
    name: 'sns_ie',
    comment: '소셜 회원 아이디,',
  })
  snsId: string;

  @Column('varchar', {
    name: 'email',
    comment: '소셜 이메일',
    nullable: false,
    unique: true,
  })
  email: string;

  @Column('varchar', {
    name: 'nickname',
    comment: '소셜 닉네임',
    nullable: false,
    unique: true,
  })
  nickname: string;
}
