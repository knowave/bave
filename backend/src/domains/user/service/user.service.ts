import UserRepository from '../repository/user.repository';
import { User } from '../entity/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';

export default class UserService {
  private userRepository: UserRepository;
  constructor() {
    this.userRepository = new UserRepository();
  }

  /**
   * 유저 생성
   */
  public async creatUser(createUser: CreateUserDto): Promise<User> {
    return await this.userRepository.creatUser(createUser);
  }

  /**
   * 특정 유저 조회
   */
  public async findOndByUser(userId: number): Promise<User> {
    return await this.userRepository.findOneByUser(userId);
  }

  /**
   * SignIn 용 특정 유저 조회
   */
  public async findOneSignInUser(email: string): Promise<User> {
    return await this.userRepository.findOneBySignInUser(email);
  }
}
