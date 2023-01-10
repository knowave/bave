import { Repository } from 'typeorm';
import { Beach } from '../entity/beach.entity';
import connectionOptions from '../database/type-orm.config';
import dotenv from 'dotenv';

export default class BeachService {
  private userRepository: Repository<Beach>;
  private env: dotenv.DotenvConfigOutput;
  private serviceUrl: string;
  private serviceKey: string;
  constructor() {
    this.userRepository = connectionOptions.getRepository(Beach);
    this.env = dotenv.config();
    this.serviceUrl = String(process.env.SERVICE_URL);
    this.serviceKey = String(process.env.SERVICE_KEY);
  }

  public async createBeach(): Promise<Beach> {
    const reqUrl;
  }
}
