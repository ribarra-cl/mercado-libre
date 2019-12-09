/*
  Project. Tech Leader Test
  Author. Richard Ibarra Ramírez - richard.ibarra@gmail.com
 */


import { Request, Response } from "express";

export class MutantsService {

  public index(req: Request, res: Response) {
    return res.status(200).send("index");
  }
}