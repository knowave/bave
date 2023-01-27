import { DataSource, Repository } from 'typeorm';
import { User } from '../entity/user.entity';
import { USER_EXCEPTION } from '../../../exception/error-code';

export class UserRepository extends Repository<User> {
  constructor(private readonly dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  /**
   * 유저 생성
   */
  public async findOrCreate(userId: string, email: string, username: string): Promise<User> {
    const existUser = await this.findOne({ where: { userId } });

    if (existUser) {
      throw USER_EXCEPTION.NOT_FOUND_USER;
    }

    const createUser = await this.create({
      email: email,
      username: username,
    });

    return createUser;
  }
}
