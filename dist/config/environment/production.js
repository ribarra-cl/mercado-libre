"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    allowedOrigins: [
        'https://your-site.com',
    ],
    mongo: {
        uri: 'mongodb://mongo/MercadoLibre'
    },
    ip: process.env.IP || undefined,
    port: process.env.PORT || 8080,
};
//# sourceMappingURL=production.js.map