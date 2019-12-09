/*
  Project. Tech Leader Test
  Author. Richard Ibarra Ramírez - richard.ibarra@gmail.com
 */

import { Application } from 'express';
import {MutantsService} from "./services/mutants.service";

export class MutantsController {

  private mutantsService: MutantsService;

  constructor(private app: Application) {
    this.mutantsService = new MutantsService();
    this.routes();
  }

  public routes() {
    this.app.route('/mutants/').post(this.mutantsService.index);
  }
}