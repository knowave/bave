import { USER_EXCEPTION } from '../../../exception/error-code';
import bcrypt from 'bcrypt';
import UserRepository from '../../user/repository/user.repository';

export default class AuthService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  /**
   * 비밀번호 유효성 검사
   */
  public async compareUser(userId: number, plainTextPassword: string): Promise<any> {
    const user = await this.userRepository.findOneByUser(userId);

    if (!user) {
      throw USER_EXCEPTION.NOT_FOUND_USER;
    }

    await this.comparePassword(plainTextPassword, user.password);
    const { password, ...result } = user;
    return result;
  }

  /**
   * 비밀번호 유횽성 검사 method
   */
  private async comparePassword(password: string, hashedPassword: string) {
    const isPasswordMatch = await bcrypt.compare(password, hashedPassword);
    if (!isPasswordMatch) {
      throw USER_EXCEPTION.NOT_MATCH_PASSWORD;
    }
  }
}
