/*
  Project. Tech Leader Test
  Author. Richard Ibarra Ramírez - richard.ibarra@gmail.com
 */

/*
 sample server from
 https://dev.to/nyagarcia/pokeapi-rest-in-nodejs-with-express-typescript-mongodb-and-docker-part-1-5f8g
 */

import * as express from "express"
import * as http from 'http'
import * as mongoose from 'mongoose'
import config from './config/environment'
import expressConfig from './config/express'
import routesConfig from './routes'

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// setup server and expose
const app: express.Application = express();
const server = http.createServer(app);

expressConfig(app);
routesConfig(app);

// connect to database after listen
// required because of tests
export const mongoConfig = (uri: string, options: mongoose.ConnectionOptions) => {
  mongoose.connect(uri, options);
};

// start server as fx
export const listen = () => {
  server.listen(config.port, config.ip, () => {
    console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
  });
}


// Expose app
export default app;