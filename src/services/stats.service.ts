/*
  Project. Tech Leader Test
  Author. Richard Ibarra Ramírez - richard.ibarra@gmail.com
 */

import {Request, Response} from "express";
import {calculateStats} from "../models/mutant.model";
import {CacheModel} from "../models/cache.model";

export class StatsService {

  constructor() {
    this.index = this.index.bind(this);
  }

  public async index(req: Request, res: Response) {
    /*
     GET /stats/
     -> returns json
     {
      "count_mutant_dna": 40,
      "count_human_dna": 100,
      "ratio": 0.4
     }
     */

    let cache = await CacheModel.findOne({});
    if(cache == null)
    {
      // no register was found, create a new one
      const stats = await calculateStats();
      cache = await CacheModel.create(stats);
    }

    res.status(200).json(cache);
  }

}