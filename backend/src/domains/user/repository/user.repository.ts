import { Repository } from 'typeorm';
import { User } from '../entity/user.entity';
import { USER_EXCEPTION } from '../../../exception/error-code';
import connectionOptions from '../../../database/type-orm.config';

export default class UserRepository {
  private userRepository: Repository<User>;
  constructor() {
    this.userRepository = connectionOptions.getRepository(User);
  }

  /**
   * 유저 생성
   */
  public async findOrCreate(userId: string, email: string, username: string): Promise<User> {
    const existUser = await this.userRepository.findOne({ where: { userId } });

    if (existUser) {
      throw USER_EXCEPTION.NOT_FOUND_USER;
    }

    const createUser = await this.userRepository.create({
      email: email,
      username: username,
    });

    return createUser;
  }
}
