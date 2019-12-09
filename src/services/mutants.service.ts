/*
  Project. Tech Leader Test
  Author. Richard Ibarra Ramírez - richard.ibarra@gmail.com
 */

import { Request, Response } from "express";
import {isMutant} from "../mutants";
import {APP_NAME} from "../constants/mutants.contants";

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