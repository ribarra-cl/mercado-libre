/*
  Project. Tech Leader Test
  Author. Richard Ibarra Ramírez - richard.ibarra@gmail.com
 */

import { expect } from 'chai';
import chai = require('chai');
import chaiHttp = require('chai-http');
import app from '../src/app';

// setup chai for testing
chai.use(chaiHttp);
chai.should();

describe('App server', () => {

  describe('POST /mutants/', () => {

    // test POST not mutant matrix
    it('not mutant matrix should return status 403', (done) => {

      chai.request(app)
        .post('/mutants/')
        .set('content-type', 'application/json')
        .send({ dna: ["ATCGCA","CAGTGC","TTATTT","AGACGG","GCGTCA","TCACTG"]})
        .end((err, res) => {
          expect(res).to.have.status(403);
          done();
        })
    });

    // test POST valid mutant matrix
    it('valid mutant matrix should return status 200', (done) => {

      chai.request(app)
        .post('/mutants/')
        .set('content-type', 'application/json')
        .send({ dna: ["ATGCGA","CAGTGC","TTATGT","AGAAGG","CCCCTA","TCACTG"]})
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        })
    });

  });
});