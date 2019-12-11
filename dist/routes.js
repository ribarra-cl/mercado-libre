"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mutants_service_1 = require("./services/mutants.service");
const stats_service_1 = require("./services/stats.service");
const routes = (app) => {
    const mutantsService = new mutants_service_1.MutantsService();
    const statsService = new stats_service_1.StatsService();
    app.route('/').get(mutantsService.root);
    app.route('/mutant/').get(mutantsService.get);
    app.route('/mutant/').post(mutantsService.post);
    app.route('/stats').get(statsService.index);
    app.route('/*')
        .get((req, res) => {
        res.sendStatus(404);
    });
};
exports.default = routes;
//# sourceMappingURL=routes.js.map