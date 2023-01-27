import { Repository } from 'typeorm';
import { User } from '../entity/user.entity';
import dotenv from 'dotenv';
import connectionOptions from '../database/type-orm.config';
import { USER_EXCEPTION } from '../exception/error-code';

export default class AuthService {
  private userRepository: Repository<User>;
  private env: dotenv.DotenvConfigOutput;

  constructor() {
    this.userRepository = connectionOptions.getRepository(User);
    this.env = dotenv.config();
  }

  /**
   * 회원 가입
   */
  public async findOrCreate(userId: number, email: string, username: string): Promise<User> {
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
