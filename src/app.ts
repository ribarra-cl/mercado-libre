/*
  Project. Tech Leader Test
  Author. Richard Ibarra Ramírez - richard.ibarra@gmail.com
 */

/*
 sample server from
 https://dev.to/nyagarcia/pokeapi-rest-in-nodejs-with-express-typescript-mongodb-and-docker-part-1-5f8g
 */

import express, { Application } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import {MutantsController} from "./mutants.controller";

class App {
  public app: Application;

  public mutantsController: MutantsController;

  constructor() {
    this.app = express();
    this.setConfig();

    // setup mutants controllers to handle requests
    this.mutantsController = new MutantsController(this.app);
  }

  private setConfig() {
    //Allows us to receive requests with data in json format
    this.app.use(bodyParser.json({ limit: '50mb' }));

    //Allows us to receive requests with data in x-www-form-urlencoded format
    this.app.use(bodyParser.urlencoded({ limit: '50mb', extended:true}));

    //Enables cors
    this.app.use(cors());
  }
}

export default new App().app;