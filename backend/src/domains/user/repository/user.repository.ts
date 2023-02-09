import { Repository } from 'typeorm';
import { Users } from '../entity/user.entity';
import { USER_EXCEPTION } from '../../../exception/error-code';
import connectionOptions from '../../../database/type-orm.config';
import { CreateUserDto } from '../dto/create-user.dto';

export default class UserRepository {
  private userRepository: Repository<Users>;
  constructor() {
    this.userRepository = connectionOptions.getRepository(Users);
  }

  /**
   * 유저 생성
   */
  public async creatUser(createUserDto: CreateUserDto): Promise<Users> {
    const { email, username, password } = createUserDto;

    const createUser = await this.userRepository.create({
      email,
      username,
      password,
    });

    await createUser.hashPassword(password);
    return await this.userRepository.save(createUser);
  }

  /**
   * 특정 유저 조회
   */
  public async findOneByUser(userId: number): Promise<Users> {
    const user = await this.userRepository.findOne({ select: ['userId', 'email', 'password', 'username'], where: { userId } });

    if (!user) {
      throw USER_EXCEPTION.NOT_FOUND_USER;
    }

    return user;
  }

  /**
   * SignIn 용 특정 유저 조회
   */
  public async findOneBySignInUser(email: string): Promise<Users> {
    const user = await this.userRepository.findOne({ select: ['userId', 'email', 'password', 'username'], where: { email } });

    if (!user) {
      throw USER_EXCEPTION.NOT_FOUND_USER;
    }

    return user;
  }

  /**
   * 발급 받은 RefreshToken 저장
   */
  public async setCurrentRefreshToken(refreshToken: string, userId: number) {
    return await this.userRepository.update(userId, { jwtToken: refreshToken });
  }

  /**
   * RefreshToken 삭제
   */
  public async removeRefreshToken(userId: number) {
    return await this.userRepository.update(userId, { jwtToken: undefined });
  }
}
