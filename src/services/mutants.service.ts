/*
  Project. Tech Leader Test
  Author. Richard Ibarra Ramírez - richard.ibarra@gmail.com
 */

import { Request, Response } from "express";
import {isMutant} from "../mutants";
import {APP_NAME} from "../constants/mutants.contants";
import {calculateStats, MutantModel} from "../models/mutant.model";
import { CacheModel} from "../models/cache.model";
import {MongooseDocument} from "mongoose";
import {IMutant} from "../interfaces/mutant.interface";

export class MutantsService {

  constructor() {
    this.send = this.send.bind(this);
    this.post = this.post.bind(this);
  }

  public root(req: Request, res: Response)
  {
    // root for server
    // -> returns plain text
    res.status(200).send(APP_NAME);
  }

  public get(req: Request, res: Response)
  {
    // -> returns method not allowed
    res.status(405).send('');
  }

  private send(res: Response, mutant: IMutant)
  {
    if(mutant.isMutant)
    {
      // register is mutant, return data and 200 code
      return res.status(200).json(mutant);
    }
    else
    {
      // register is not mutant, returns 403
      return res.status(403).send();
    }
  }

  public async post(req: Request, res: Response) {

    /*
      dna: string[]
        - array of strings representing dna matrix

      ->
      200: dna is mutant
      403: otherwise
     */

    try {

      let isMutantDNA = false;
      let dna: string[];
      if (req.body.dna) {
        dna = req.body.dna;
        isMutantDNA = isMutant(dna);

        const data = {
          dna: req.body.dna,
          isMutant: isMutantDNA
        }

        // check if register exists
        const register = await MutantModel.findOne({ dna });
        if(register) // register already exists
          return this.send(res, register);

        // save request register
        const mutant = await new MutantModel(data).save();

        // recalculate cache
        const stats = await calculateStats();
        let cache = await CacheModel.findOne({});
        if(cache == null)
        {
          await new CacheModel(stats).save();
        }
        else
        {
          await CacheModel.update({
            _id: cache._id
          }, stats);
        }

        return this.send(res, mutant);

      } else {
        return res.status(403).send();
      }
    } catch(err)
    {
      // error saving model, send corresponding error
      return res.status(500).send(err);
    }
  }
}