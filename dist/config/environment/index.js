"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const development_1 = require("./development");
const production_1 = require("./production");
const test_1 = require("./test");
const commonConfig = {
    appName: process.env.APP_NAME || `MercadoLibre-${process.env.NODE_ENV}`,
    env: process.env.NODE_ENV,
    mongo: {
        options: {
            poolSize: 20,
            useCreateIndex: true,
            useNewUrlParser: true,
        },
    },
    port: Number(process.env.PORT) || 8080,
    secrets: {
        session: process.env.SECRET_SESSION || 'mySecret'
    },
};
const config = commonConfig;
if (commonConfig.env === 'development') {
    _.merge(config, development_1.default);
}
else if (commonConfig.env === 'test') {
    _.merge(config, test_1.default);
}
else if (commonConfig.env === 'production') {
    _.merge(config, production_1.default);
}
else {
    throw new Error('Please set an environment');
}
exports.default = config;
//# sourceMappingURL=index.js.map