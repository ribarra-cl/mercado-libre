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

  it('not matching array length is not mutant - 2', () =>
  {
    /*
      A T C G
      T C G A
      C G A T
      G A T
     */
    const result = isMutant(["ATCG", "TCGA", "CGAT", "GAT"]);
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

  it('matrix is not mutant, only one match', () =>
  {
    /*
      A A A A
      T C G A
      C G A T
      A A T C
     */
    const result = isMutant(["AAAA", "TCGA", "CGAT", "AATC"]);
    expect(result).to.be.false;
  });

  it('matrix is not mutant, only one match (first col)', () =>
  {
    /*
      A T C G
      A C G A
      A G A T
      A A T C
     */
    // changed last row to no get G on diagonal
    const result = isMutant(["ATCG", "ACGA", "AGAT", "AATC"]);
    expect(result).to.be.false;
  });


  it('matrix is mutant, A in first row and first col', () =>
  {
    /*
      A A A A
      A C G A
      A G A T
      A A T C
     */
    const result = isMutant(["AAAA", "ACGA", "AGAT", "AATC"]);
    expect(result).to.be.true;
  });

  it('matrix is mutant, A in first col and diagonal', () =>
  {
    /*
      A T C G
      A A G A
      A G A T
      A A T A
     */
    const result = isMutant(["ATCG", "AAGA", "AGAT", "AATA"]);
    expect(result).to.be.true;
  });

  it('sample matrix (1) from test is not mutant', () =>
  {
    /*
      A T C G C A
      C A G T G C
      T T A T T T
      A G A C G G
      G C G T C A
      T C A C T G
     */
    const result = isMutant(["ATCGCA","CAGTGC","TTATTT","AGACGG","GCGTCA","TCACTG"]);
    expect(result).to.be.false;
  });

  it('sample matrix (2) from test is mutant', () =>
  {
    /*
      A T C G G A
      C A G T G C
      T T A T G T
      A G A A G G
      C C C C T A
      T C A C T G
     */
    const result = isMutant(["ATGCGA","CAGTGC","TTATGT","AGAAGG","CCCCTA","TCACTG"]);
    expect(result).to.be.true;
  });

  //TODO: add tests for big matrices

});