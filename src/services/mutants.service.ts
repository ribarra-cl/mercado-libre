/*
  Project. Tech Leader Test
  Author. Richard Ibarra Ramírez - richard.ibarra@gmail.com
 */


import { Request, Response } from "express";
import {isMutant} from "../mutants";

export class MutantsService {

  public index(req: Request, res: Response) {

    /*
      dna: string[]
        - array of strings representing dna matrix

      ->
      200: dna is mutant
      403: otherwise
     */

    let mutantDna = false;
    if(req.body.dna)
    {
      const dnaAry: string[] = req.body.dna;
      mutantDna = isMutant(dnaAry);
    }

    if(mutantDna) {
      return res.status(200).send();
    }
    else {
      return res.status(403).send();
    }
  }
}