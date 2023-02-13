import { USER_EXCEPTION } from '../../../exception/error-code';
import bcrypt from 'bcrypt';
import UserRepository from '../../user/repository/user.repository';
import dotenv, { DotenvConfigOutput } from 'dotenv';
import jwt from 'jsonwebtoken';
import { Users } from '../../user/entity/user.entity';

export default class AuthService {
  private userRepository: UserRepository;
  private env: DotenvConfigOutput;

  constructor() {
    this.userRepository = new UserRepository();
    this.env = dotenv.config();
  }

  /**
   * email로 유저 조회
   */
  public async findOneSignInUser(email: string): Promise<Users> {
    return await this.userRepository.findOneBySignInUser(email);
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
    const expiresIn = process.env.JWT_ACCESS_TOKEN_EXPIRATION_TIME;

    return jwt.sign({ userId, email, password }, secretKey, { expiresIn: expiresIn });
  }

  /**
   * RefreshToken
   */
  public async generateRefreshToken(userId: number, email: string, password: string) {
    const secretKey = String(process.env.JWT_REFRESH_SECRET_KEY);
    const expiresIn = process.env.JWT_REFRESH_TOKEN_EXPIRATION_TIME;

    return jwt.sign({ userId, email, password }, secretKey, { expiresIn: expiresIn });
  }

  /**
   * 발급 받은 RefreshToken 저장
   */
  public async setCurrentRefreshToken(refreshToken: string, userId: number) {
    if (!userId) {
      throw USER_EXCEPTION.NOT_FOUND_USER;
    }

    return await this.userRepository.setCurrentRefreshToken(refreshToken, userId);
  }

  /**
   * refreshToken 삭제
   */
  public async removeRefreshToken(userId: number) {
    if (!userId) {
      throw USER_EXCEPTION.NOT_FOUND_USER;
    }

    return this.userRepository.removeRefreshToken(userId);
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
