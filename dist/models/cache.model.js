"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const CacheSchema = new mongoose.Schema({
    count_mutant_dna: Number,
    count_human_dna: Number,
    ratio: Number
}, {
    timestamps: true
});
exports.CacheModel = mongoose.model('cache', CacheSchema);
//# sourceMappingURL=cache.model.js.map