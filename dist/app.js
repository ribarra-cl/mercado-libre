"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const environment_1 = require("./config/environment");
const express_1 = require("./config/express");
const routes_1 = require("./routes");
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
const app = express();
const server = http.createServer(app);
express_1.default(app);
routes_1.default(app);
exports.mongoConfig = (uri, options) => {
    mongoose.connect(uri, options);
};
exports.listen = () => {
    server.listen(environment_1.default.port, environment_1.default.ip, () => {
        console.log('Express server listening on %d, in %s mode', environment_1.default.port, app.get('env'));
    });
};
exports.default = app;
//# sourceMappingURL=app.js.map