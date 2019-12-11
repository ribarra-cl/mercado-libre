/*
  Project. Tech Leader Test
  Author. Richard Ibarra Ramírez - richard.ibarra@gmail.com
 */

import { Document } from 'mongoose';

export interface IMutant extends Document
{
  dna: [String],
  isMutant: Boolean
}