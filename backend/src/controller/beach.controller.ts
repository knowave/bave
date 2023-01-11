import BeachService from '../service/beach.service';
import { RequestHandler } from 'express';
import { Beach } from '../entity/beach.entity';

export default class BeachController {
  private beachService: BeachService;

  constructor(beachService: BeachService) {
    this.beachService = beachService;
  }

  public getAllBeach: RequestHandler = async (): Promise<Beach[]> => {
    const beaches = await this.beachService.getAllBeach();
    return beaches;
  };
}
