/*
  Project. Tech Leader Test
  Author. Richard Ibarra Ramírez - richard.ibarra@gmail.com
 */

import mongoose from 'mongoose';
const MutantSchema = new mongoose.Schema({
  dna: [String]
}, {
  timestamps: true
});

export const MutantModel = mongoose.model('mutants', MutantSchema);