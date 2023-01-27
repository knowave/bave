import { BeachRepository } from '../repository/beach.repository';
import { Beach } from '../entity/beach.entity';

export class BeachService {
  constructor(private beachRepository: BeachRepository) {}

  /**
   * 해수욕장 전체 조회
   */
  public async getAllBeach(query: any): Promise<Beach[]> {
    return await this.beachRepository.getAllBeach(query);
  }

  /**
   * 특정 해수욕장 조회
   */
  public async findOneByBeach(beachId: number): Promise<Beach | null> {
    return await this.beachRepository.findOneByBeach(beachId);
  }
}
