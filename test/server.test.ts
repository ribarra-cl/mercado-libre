/*
  Project. Tech Leader Test
  Author. Richard Ibarra Ramírez - richard.ibarra@gmail.com
 */

import { expect } from 'chai';
import chai = require('chai');
import chaiHttp = require('chai-http');
const { MongoMemoryServer } = require('mongodb-memory-server');
import {Application} from "express";
import App from "../src/app";

// setup chai for testing
chai.use(chaiHttp);
chai.should();

describe('App server', () => {

  let app: Application;

  before(async() => {
    // setup mongo in memory server
    const mongod = new MongoMemoryServer();
    const mongoURL = await mongod.getConnectionString();

    app = new App(mongoURL).app;
  });

  describe('GET /', () => {
    it('root should return simple text', () => {

      chai.request(app)
        .get('/')
        .end((err, res) => {
          expect(res).to.have.status(200);
        })

    });
  });

  describe('GET /foo', () => {
    it('invalid url should have status 404', () => {

      chai.request(app)
        .get('/foo')
        .end((err, res) => {
          expect(res).to.have.status(404);
        })

    });
  });

  describe('GET /mutants/', () => {

    it('GET /mutants/ should return method not allowed', (done) => {

      chai.request(app)
        .get('/mutants/')
        .end((err, res) => {
          expect(res).to.have.status(405);
          done();
        })
    });

  });

  describe('POST /mutants/', () => {

    it('invalid data format', (done) => {

      chai.request(app)
        .post('/mutants/')
        .end((err, res) => {
          expect(res).to.have.status(403);
          done();
        })
    });

    it('key not found', (done) => {

      chai.request(app)
        .post('/mutants/')
        .set('content-type', 'application/json')
        .send({ foo: "bar"})
        .end((err, res) => {
          expect(res).to.have.status(403);
          done();
        })
    });

    it('invalid dna format: string', (done) => {

      chai.request(app)
        .post('/mutants/')
        .set('content-type', 'application/json')
        .send({ dna: "ATCGCA"})
        .end((err, res) => {
          expect(res).to.have.status(403);
          done();
        })
    });

    it('invalid dna format: not matching length', (done) => {

      chai.request(app)
        .post('/mutants/')
        .set('content-type', 'application/json')
        .send({ dna: ["ATCGCA"]})
        .end((err, res) => {
          expect(res).to.have.status(403);
          done();
        })
    });

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