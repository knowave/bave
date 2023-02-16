import UserRepository from '../repository/user.repository';
import { Users } from '../entity/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import { USER_EXCEPTION } from '../../../exception/error-code';

export default class UserService {
  private userRepository: UserRepository;
  constructor() {
    this.userRepository = new UserRepository();
  }

  /**
   * 유저 생성
   */
  public async creatUser(createUserDto: CreateUserDto): Promise<Users> {
    return await this.userRepository.creatUser(createUserDto);
  }

  /**
   * 특정 유저 조회
   */
  public async findOndByUser(userId: number): Promise<Users> {
    return await this.userRepository.findOneByUser(userId);
  }
}
