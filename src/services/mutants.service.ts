/*
  Project. Tech Leader Test
  Author. Richard Ibarra Ramírez - richard.ibarra@gmail.com
 */

import { Request, Response } from "express";
import {isMutant} from "../mutants";
import {APP_NAME} from "../constants/mutants.contants";
import {MutantModel} from "../models/mutant.model";
import {MongooseDocument} from "mongoose";

export class MutantsService {

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

  public post(req: Request, res: Response) {

    /*
      dna: string[]
        - array of strings representing dna matrix

      ->
      200: dna is mutant
      403: otherwise
     */

    let isMutantDNA = false;
    let dna: string[];
    if(req.body.dna)
    {
      dna = req.body.dna;
      isMutantDNA = isMutant(dna);

      const data = {
        dna: req.body.dna,
        isMutant: isMutantDNA
      }

      const mutant = new MutantModel(data);
      mutant.save((error: Error, mutantDocument: MongooseDocument) => {
        if(error) {
          // error saving model, send corresponding error
          res.status(500).send(error);
        }
        else
        {
          if(isMutantDNA)
          {
            res.status(200).json(mutantDocument);
          }
          else
          {
            res.status(403).send();
          }
        }
      });
    } else {
      return res.status(403).send();
    }
  }
}