"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const MutantSchema = new mongoose.Schema({
    dna: [String],
    isMutant: Boolean
}, {
    timestamps: true
});
exports.MutantModel = mongoose.model('mutants', MutantSchema);
exports.calculateStats = () => __awaiter(void 0, void 0, void 0, function* () {
    const docs = yield exports.MutantModel.aggregate([
        {
            $group: {
                _id: '$isMutant',
                count: {
                    $sum: 1
                }
            }
        }
    ]);
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
    return stats;
});
//# sourceMappingURL=mutant.model.js.map