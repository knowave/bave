import BeachService from '../service/beach.service';

export default class BeachController {
  private beachService: BeachService;

  constructor(beachService: BeachService) {
    this.beachService = beachService;
  }
}
