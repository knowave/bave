import { DataSource, Repository } from 'typeorm';
import { Beach } from '../entity/beach.entity';
import { BEACH_EXCEPTION } from '../../../exception/error-code';

export class BeachRepository extends Repository<Beach> {
  constructor(private readonly dataSource: DataSource) {
    super(Beach, dataSource.createEntityManager());
  }

  /**
   * 해수욕장 전체 조회
   */
  public async getAllBeach(query: any): Promise<Beach[]> {
    const limit = query.itemPerPage ?? 20;
    const page = query.page ?? 1;
    const skip = limit * (page - 1) ?? 0;
    const beaches = await this.createQueryBuilder('beach').limit(limit).skip(skip).orderBy('beach.beachId', query.sort).getMany();
    if (beaches.length === 0) {
      throw BEACH_EXCEPTION.NOT_FOUND_BEACHES;
    }
    return beaches;
  }

  /**
   * 특정 해수욕장 조회
   */
  public async findOneByBeach(beachId: number): Promise<Beach | null> {
    const beach = await this.findOne({ where: { beachId } });

    if (!beach) {
      throw BEACH_EXCEPTION.NOT_FOUND_BEACH;
    }

    return beach;
  }
}
