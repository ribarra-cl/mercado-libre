/*
  Project. Tech Leader Test
  Author. Richard Ibarra Ramírez - richard.ibarra@gmail.com
 */

import * as mongoose from "mongoose";

const CacheSchema = new mongoose.Schema({
  count_mutant_dna: Number,
  count_human_dna: Number,
  ratio: Number
}, {
  timestamps: true
});

export const CacheModel = mongoose.model('cache', CacheSchema);