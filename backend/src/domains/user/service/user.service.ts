import UserRepository from '../repository/user.repository';
import { User } from '../entity/user.entity';

export default class UserService {
  private userRepository: UserRepository;
  constructor() {
    this.userRepository = new UserRepository();
  }

  /**
   * 유저 생성
   */
  public async findOrCreate(userId: string, email: string, username: string): Promise<User> {
    return await this.userRepository.findOrCreate(userId, email, username);
  }

  /**
   * 특정 유저 조회
   */
  public async findOndeByUser(userId: string): Promise<User> {
    return await this.userRepository.findOneByUser(userId);
  }
}
