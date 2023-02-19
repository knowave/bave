import { Repository } from 'typeorm';
import { Beach } from '../entity/beach.entity';
import { BEACH_EXCEPTION } from '../../../exception/error-code';
import connectionOptions from '../../../database/type-orm.config';

export default class BeachRepository {
  private beachRepository: Repository<Beach>;
  constructor() {
    this.beachRepository = connectionOptions.getRepository(Beach);
  }

  /**
   * 해수욕장 전체 조회
   */
  public async getAllBeach(query: any): Promise<Beach[]> {
    const limit = query.itemPerPage ?? 10;
    const page = query.page ?? 1;
    const skip = limit * (page - 1) ?? 0;
    const beaches = await this.beachRepository.createQueryBuilder('beach').take(limit).skip(skip).orderBy('beach.beachId', 'DESC').getMany();
    if (beaches.length === 0) {
      throw BEACH_EXCEPTION.NOT_FOUND_BEACHES;
    }
    return beaches;
  }

  /**
   * 특정 해수욕장 조회
   */
  public async findOneByBeach(beachId: number): Promise<Beach> {
    const beach = await this.beachRepository.findOne({ where: { beachId } });

    if (!beach) {
      throw BEACH_EXCEPTION.NOT_FOUND_BEACH;
    }

    return beach;
  }
}
