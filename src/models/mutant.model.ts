/*
  Project. Tech Leader Test
  Author. Richard Ibarra Ramírez - richard.ibarra@gmail.com
 */

import mongoose, {Schema} from 'mongoose';
const MutantSchema = new mongoose.Schema({
  dna: [String],
  isMutant: Boolean
}, {
  timestamps: true
});

export const MutantModel = mongoose.model('mutants', MutantSchema);