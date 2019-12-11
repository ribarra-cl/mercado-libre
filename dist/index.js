"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const environment_1 = require("./config/environment");
const app_1 = require("./app");
app_1.mongoConfig(environment_1.default.mongo.uri, environment_1.default.mongo.options);
app_1.listen();
//# sourceMappingURL=index.js.map