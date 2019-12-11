/*
  Project. Tech Leader Test
  Author. Richard Ibarra Ramírez - richard.ibarra@gmail.com
 */

import * as express from 'express'
import {MutantsService} from "./services/mutants.service";
import {StatsService} from "./services/stats.service";

const routes = (app: express.Application): void => {

  const mutantsService = new MutantsService();
  const statsService = new StatsService();

  app.route('/').get(mutantsService.root);
  app.route('/mutant/').get(mutantsService.get);
  app.route('/mutant/').post(mutantsService.post);
  app.route('/stats').get(statsService.index);

  // All other routes should 404
  app.route('/*')
    .get((req: express.Request, res: express.Response) => {
      res.sendStatus(404)
    });
};

export default routes