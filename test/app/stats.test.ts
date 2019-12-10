/*
  Project. Tech Leader Test
  Author. Richard Ibarra Ramírez - richard.ibarra@gmail.com
 */

const chai = require('chai');
const chaiHttp = require('chai-http');
import * as mongo from 'mongodb-memory-server';
import app, { mongoConfig } from "../../src/app";
import config from "../../src/config/environment";
import {VALID_MATRICES} from "../../mocks/mutants.mock";

// setup chai for testing
chai.use(chaiHttp);
chai.should();

describe('APP /stats', () => {

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

  describe('Creates register and check stats', () => {

    it('stats tests', async () => {

      let res = await chai.request(app).get('/stats/');

      chai.expect(res).to.have.status(200);
      chai.expect(res.body).to.have.property('count_mutant_dna').to.be.equal(0);
      chai.expect(res.body).to.have.property('count_human_dna').to.be.equal(0);
      chai.expect(res.body).to.have.property('ratio').to.be.equal(0);

      await chai.request(app)
        .post('/mutants/')
        .set('content-type', 'application/json')
        .send({dna: VALID_MATRICES.sample_1});

      res = await chai.request(app).get('/stats/');

      chai.expect(res).to.have.status(200);
      chai.expect(res.body).to.have.property('count_mutant_dna').to.be.equal(1);
      chai.expect(res.body).to.have.property('count_human_dna').to.be.equal(0);
      chai.expect(res.body).to.have.property('ratio').to.be.equal(0);

    });
  });
});