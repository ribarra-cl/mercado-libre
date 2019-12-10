"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mutant_model_1 = require("../models/mutant.model");
class StatsService {
    index(req, res) {
        mutant_model_1.MutantModel
            .aggregate([
            {
                $group: {
                    _id: '$isMutant',
                    count: {
                        $sum: 1
                    }
                }
            }
        ], (error, docs) => {
            const mutants = docs.find((item) => item._id === true);
            const humans = docs.find((item) => item._id === false);
            const count_mutant_dna = mutants ? mutants.count : 0;
            const count_human_dna = humans ? humans.count : 0;
            const ratio = count_human_dna > 0 ? count_mutant_dna / count_human_dna : 0;
            const stats = {
                count_mutant_dna,
                count_human_dna,
                ratio
            };
            res.status(200).json(stats);
        });
    }
}
exports.StatsService = StatsService;
//# sourceMappingURL=stats.service.js.map