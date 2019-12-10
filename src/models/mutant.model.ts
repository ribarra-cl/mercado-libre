/*
  Project. Tech Leader Test
  Author. Richard Ibarra Ramírez - richard.ibarra@gmail.com
 */


import * as mongoose from "mongoose";

const MutantSchema = new mongoose.Schema({
  dna: [String],
  isMutant: Boolean
}, {
  timestamps: true
});

export const MutantModel = mongoose.model('mutants', MutantSchema);