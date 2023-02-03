import { USER_EXCEPTION } from '../../../exception/error-code';
import bcrypt from 'bcrypt';
import UserRepository from '../../user/repository/user.repository';
import dotenv, { DotenvConfigOutput } from 'dotenv';
import jwt from 'jsonwebtoken';

export default class AuthService {
  private userRepository: UserRepository;
  private env: DotenvConfigOutput;

  constructor() {
    this.userRepository = new UserRepository();
    this.env = dotenv.config();
  }

  /**
   * 비밀번호 유효성 검사
   */
  public async compareUser(email: string, plainTextPassword: string): Promise<any> {
    const user = await this.userRepository.findOneBySignInUser(email);

    if (!user) {
      throw USER_EXCEPTION.NOT_FOUND_USER;
    }

    await this.comparePassword(plainTextPassword, user.password);
    const { password, ...result } = user;
    return result;
  }

  /**
   * Token 발급
   */
  public async generateToken(userId: number, email: string, password: string) {
    const secretKey = String(process.env.JWT_SECRET_KEY);

    const token = jwt.sign({ userId, email, password }, secretKey);
    return token;
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
