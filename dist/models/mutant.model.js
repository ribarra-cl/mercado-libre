"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const MutantSchema = new mongoose.Schema({
    dna: [String],
    isMutant: Boolean
}, {
    timestamps: true
});
exports.MutantModel = mongoose.model('mutants', MutantSchema);
//# sourceMappingURL=mutant.model.js.map