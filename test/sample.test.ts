/*
  Project. Tech Leader Test
  Author. Richard Ibarra Ramírez - richard.ibarra@gmail.com
 */

import { expect } from 'chai';
import { returnTrue } from "../src/sample";

describe('returnTrue', () => {
  it('function always returns true', () => {
    const result = returnTrue();
    expect(result).to.be.true;
  });

});