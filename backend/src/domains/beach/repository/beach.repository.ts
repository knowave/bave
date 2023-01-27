import { Repository } from 'typeorm';
import { Beach } from '../entity/beach.entity';
import connectionOptions from '../../../database/type-orm.config';
import dotenv from 'dotenv';
import { BEACH_EXCEPTION } from '../../../exception/error-code';

export default class BeachRepository {
  private beachRepository: Repository<Beach>;
  private env: dotenv.DotenvConfigOutput;
  private serviceUrl: string;
  private serviceKey: string;
  constructor() {
    this.beachRepository = connectionOptions.getRepository(Beach);
    this.env = dotenv.config();
    this.serviceUrl = String(process.env.SERVICE_URL);
    this.serviceKey = String(process.env.SERVICE_KEY);
  }

  /**
   * 해수욕장 전체 조회
   */
  public async getAllBeach(query: any): Promise<Beach[]> {
    const limit = query.itemPerPage ?? 20;
    const page = query.page ?? 1;
    const skip = limit * (page - 1) ?? 0;
    const beaches = await this.beachRepository.createQueryBuilder('beach').limit(limit).skip(skip).orderBy('beach.beachId', query.sort).getMany();
    if (beaches.length === 0) {
      throw BEACH_EXCEPTION.NOT_FOUND_BEACHES;
    }
    return beaches;
  }

  /**
   * 특정 해수욕장 조회
   */
  public async findOneByBeach(beachId: number): Promise<Beach | null> {
    const beach = await this.beachRepository.findOne({ where: { beachId } });

    if (!beach) {
      throw BEACH_EXCEPTION.NOT_FOUND_BEACH;
    }

    return beach;
  }
}
