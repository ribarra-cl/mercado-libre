/*
  Project. Tech Leader Test
  Author. Richard Ibarra Ramírez - richard.ibarra@gmail.com
 */

import config from './config/environment';
import { listen, mongoConfig } from "./app";

mongoConfig(config.mongo.uri, config.mongo.options);
listen();
