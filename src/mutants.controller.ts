/*
  Project. Tech Leader Test
  Author. Richard Ibarra Ramírez - richard.ibarra@gmail.com
 */

import { Application } from 'express';
import {MutantsService} from "./services/mutants.service";
import {StatsService} from "./services/stats.service";

export class MutantsController {

  private mutantsService: MutantsService;
  private statsService: StatsService;

  constructor(private app: Application) {
    this.mutantsService = new MutantsService();
    this.statsService = new StatsService();
    this.routes();
  }

  public routes() {
    this.app.route('/').get(this.mutantsService.root);
    this.app.route('/mutants/').get(this.mutantsService.get);
    this.app.route('/mutants/').post(this.mutantsService.post);
    this.app.route('/stats').get(this.statsService.index);
  }
}