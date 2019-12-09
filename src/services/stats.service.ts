/*
  Project. Tech Leader Test
  Author. Richard Ibarra Ramírez - richard.ibarra@gmail.com
 */

import {Request, Response} from "express";
import {MutantModel} from "../models/mutant.model";
import StatInterface from "../interfaces/stat.interface";

export class StatsService {

  public index(req: Request, res: Response) {
    /*
     GET /stats/
     -> returns json
     {
      "count_mutant_dna": 40,
      "count_human_dna": 100,
      "ratio": 0.4
     }
     */
    MutantModel
      .aggregate([
        {
          $group: {
            _id: '$isMutant',
            count: {
              $sum: 1
            }
          }
        }], (error: Error, docs: any[]) => {

        const mutants = docs.find((item: any) => item._id === true);
        const humans =  docs.find((item: any) => item._id === false);

        const count_mutant_dna = mutants ? mutants.count : 0;
        const count_human_dna = humans ? humans.count : 0;

        // if not humans requests have been registered => set ratio to 0 to avoid division by 0
        const ratio = count_human_dna > 0 ? count_mutant_dna / count_human_dna : 0;
        const stats: StatInterface = {
          count_mutant_dna,
          count_human_dna,
          ratio
        }
        res.status(200).json(stats);
      });
  }

}