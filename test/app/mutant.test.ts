/*
  Project. Tech Leader Test
  Author. Richard Ibarra Ramírez - richard.ibarra@gmail.com
 */

const chai = require('chai');
const chaiHttp = require('chai-http');
import * as mongo from 'mongodb-memory-server';
import app, { mongoConfig } from "../../src/app";
import config from "../../src/config/environment";

// setup chai for testing
chai.use(chaiHttp);
chai.should();

describe('APP /mutant/', () => {

  let mongod: mongo.MongoMemoryServer;

  before(async () => {
    // setup mongo in memory server
    mongod = new mongo.MongoMemoryServer();
    const uri = await mongod.getConnectionString();

    mongoConfig(uri, config.mongo.options);

  });

  after(async () => {
    await mongod.stop();
  });

  describe('GET /', () => {
    it('root should return simple text', () => {

      chai.request(app)
        .get('/')
        .end((err: Error, res: any) => {
          chai.expect(res).to.have.status(200);
        })

    });
  });

  describe('GET /foo', () => {
    it('invalid url should have status 404', () => {

      chai.request(app)
        .get('/foo')
        .end((err: Error, res: any) => {
          chai.expect(res).to.have.status(404);
        })

    });
  });

  describe('GET /mutant/', () => {

    it('GET /mutants/ should return method not allowed', (done) => {

      chai.request(app)
        .get('/mutant/')
        .end((err: Error, res: any) => {
          chai.expect(res).to.have.status(405);
          done();
        })
    });

  });

  describe('POST /mutants/', () => {

    it('invalid data format', (done) => {

      chai.request(app)
        .post('/mutant/')
        .end((err: Error, res: any) => {
          chai.expect(res).to.have.status(403);
          done();
        })
    });

    it('key not found', (done) => {

      chai.request(app)
        .post('/mutant/')
        .set('content-type', 'application/json')
        .send({ foo: "bar"})
        .end((err: Error, res: any) => {
          chai.expect(res).to.have.status(403);
          done();
        })
    });

    it('invalid dna format: string', (done) => {

      chai.request(app)
        .post('/mutant/')
        .set('content-type', 'application/json')
        .send({ dna: "ATCGCA"})
        .end((err: Error, res: any) => {
          chai.expect(res).to.have.status(403);
          done();
        })
    });

    it('invalid dna format: not matching length', (done) => {

      chai.request(app)
        .post('/mutant/')
        .set('content-type', 'application/json')
        .send({ dna: ["ATCGCA"]})
        .end((err: Error, res: any) => {
          chai.expect(res).to.have.status(403);
          done();
        })
    });

    it('not mutant matrix should return status 403', (done) => {

      chai.request(app)
        .post('/mutant/')
        .set('content-type', 'application/json')
        .send({ dna: ["ATCGCA","CAGTGC","TTATTT","AGACGG","GCGTCA","TCACTG"]})
        .end((err: Error, res: any) => {
          chai.expect(res).to.have.status(403);
          done();
        })
    });

    // test POST not mutant matrix
    it('not mutant matrix should return status 403', (done) => {

      chai.request(app)
        .post('/mutant/')
        .set('content-type', 'application/json')
        .send({ dna: ["ATCGCA","CAGTGC","TTATTT","AGACGG","GCGTCA","TCACTG"]})
        .end((err: Error, res: any) => {
          chai.expect(res).to.have.status(403);
          done();
        })
    });

    // test POST valid mutant matrix
    it('valid mutant matrix should return status 200', (done) => {

      chai.request(app)
        .post('/mutant/')
        .set('content-type', 'application/json')
        .send({ dna: ["ATGCGA","CAGTGC","TTATGT","AGAAGG","CCCCTA","TCACTG"]})
        .end((err: Error, res: any) => {
          chai.expect(res).to.have.status(200);
          done();
        })
    });

  });
});