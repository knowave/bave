import { Repository } from 'typeorm';
import { User } from '../entity/user.entity';
import { USER_EXCEPTION } from '../../../exception/error-code';
import connectionOptions from '../../../database/type-orm.config';
import { CreateUserDto } from '../dto/create-user.dto';

export default class UserRepository {
  private userRepository: Repository<User>;
  constructor() {
    this.userRepository = connectionOptions.getRepository(User);
  }

  /**
   * 유저 생성
   */
  public async creatUser(createUserDto: CreateUserDto): Promise<User> {
    const { userId, email, username, password, confirmPassword } = createUserDto;
    const existUser = await this.userRepository.findOne({ where: { userId } });

    if (existUser !== null) {
      throw USER_EXCEPTION.EXIST_USER;
    }

    if (password !== confirmPassword) {
      throw USER_EXCEPTION.NOT_MATCH_PASSWORD;
    }

    const createUser = await this.userRepository.create({
      userId,
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
  public async findOneByUser(userId: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { userId } });

    if (!user) {
      throw USER_EXCEPTION.NOT_FOUND_USER;
    }

    return user;
  }
}
