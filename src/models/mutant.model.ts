/*
  Project. Tech Leader Test
  Author. Richard Ibarra Ramírez - richard.ibarra@gmail.com
 */


import * as mongoose from "mongoose";
import StatInterface from "../interfaces/stat.interface";
import {IMutant} from "../interfaces/mutant.interface";

const MutantSchema = new mongoose.Schema({
  dna: [String],
  isMutant: Boolean
}, {
  timestamps: true
});

export const MutantModel = mongoose.model<IMutant>('mutants', MutantSchema);

//TODO: find another better place for fx
export const calculateStats = async (): Promise<StatInterface> => {

  const docs: any[] = await MutantModel.aggregate([
    {
      $group: {
        _id: '$isMutant',
        count: {
          $sum: 1
        }
      }
    }]);

  const mutants = docs.find((item: any) => item._id === true);
  const humans = docs.find((item: any) => item._id === false);

  const count_mutant_dna = mutants ? mutants.count : 0;
  const count_human_dna = humans ? humans.count : 0;

  // if not humans requests have been registered => set ratio to 0 to avoid division by 0
  const ratio = count_human_dna > 0 ? count_mutant_dna / count_human_dna : 0;
  const stats: StatInterface = {
    count_mutant_dna,
    count_human_dna,
    ratio
  }
  return stats;

}
