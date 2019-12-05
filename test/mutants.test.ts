/*
  Project. Tech Leader Test
  Author. Richard Ibarra Ramírez - richard.ibarra@gmail.com
 */

import { expect } from 'chai';
import { isMutant } from "../src/mutants";

describe('isMutant', () => {

  it('empty array is not mutant', () =>
  {
    const result = isMutant([]);
    expect(result).to.be.false;
  });

  it('not matching array length is not mutant', () =>
  {
    const result = isMutant(["AT", "A"]);
    expect(result).to.be.false;
  });

  it('sample matrix is not mutant', () =>
  {
    /*
      A T C G
      T C G A
      C G A T
      A A T C
     */
    // changed last row to no get G on diagonal
    const result = isMutant(["ATCG", "TCGA", "CGAT", "AATC"]);
    expect(result).to.be.false;
  });

  it('matrix is mutant, A in first row', () =>
  {
    /*
      A A A A
      T C G A
      C G A T
      A A T C
     */
    // changed last row to no get G on diagonal
    const result = isMutant(["AAAA", "TCGA", "CGAT", "AATC"]);
    expect(result).to.be.true;
  });

  it('matrix is mutant, A in first col', () =>
  {
    /*
      A T C G
      A C G A
      A G A T
      A A T C
     */
    // changed last row to no get G on diagonal
    const result = isMutant(["ATCG", "ACGA", "AGAT", "AATC"]);
    expect(result).to.be.true;
  });

  it('matrix is mutant, G in first col', () =>
  {
    /*
      A T C G
      A C G A
      A G A T
      A A T C
     */
    // changed last row to no get G on diagonal
    const result = isMutant(["ATCG", "ACGA", "AGAT", "AATC"]);
    expect(result).to.be.true;
  });

});