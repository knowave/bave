import { UserRepository } from '../repository/user.repository';
import { User } from '../entity/user.entity';

export default class UserService {
  constructor(private userRepository: UserRepository) {}

  /**
   * 유저 생성
   */
  public async findOrCreate(userId: string, email: string, username: string): Promise<User> {
    return await this.userRepository.findOrCreate(userId, email, username);
  }
}
