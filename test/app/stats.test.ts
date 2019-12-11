/*
  Project. Tech Leader Test
  Author. Richard Ibarra Ramírez - richard.ibarra@gmail.com
 */

import {MutantModel} from "../../src/models/mutant.model";

const chai = require('chai');
const chaiHttp = require('chai-http');
import * as mongo from 'mongodb-memory-server';
import app, {mongoConfig} from "../../src/app";
import config from "../../src/config/environment";
import {INVALID_MATRICES, VALID_MATRICES} from "../../mocks/mutants.mock";
import {CacheModel} from "../../src/models/cache.model";

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

  afterEach(async() => {

    // drop all data after each test
    await MutantModel.deleteMany({});
    await CacheModel.deleteMany({});

  });

  const post = async (resource: string, data: any) => {

    return chai.request(app)
      .post(resource)
      .set('content-type', 'application/json')
      .send(data);
  }

  it('stats tests', async () => {

    let res = await chai.request(app).get('/stats/');

    chai.expect(res).to.have.status(200);
    chai.expect(res.body).to.have.property('count_mutant_dna').to.be.equal(0);
    chai.expect(res.body).to.have.property('count_human_dna').to.be.equal(0);
    chai.expect(res.body).to.have.property('ratio').to.be.equal(0);

    await post('/mutant/', {dna: VALID_MATRICES.sample_1});

    res = await chai.request(app).get('/stats/');

    chai.expect(res).to.have.status(200);
    chai.expect(res.body).to.have.property('count_mutant_dna').to.be.equal(1);
    chai.expect(res.body).to.have.property('count_human_dna').to.be.equal(0);
    chai.expect(res.body).to.have.property('ratio').to.be.equal(0);

    await post('/mutant/', {dna: INVALID_MATRICES.sample_0});

    res = await chai.request(app).get('/stats/');

    chai.expect(res).to.have.status(200);
    chai.expect(res.body).to.have.property('count_mutant_dna').to.be.equal(1);
    chai.expect(res.body).to.have.property('count_human_dna').to.be.equal(1);
    chai.expect(res.body).to.have.property('ratio').to.be.equal(1);

  });

  it('Checking twice same register does not affect stats', async () => {

    let res = await chai.request(app).get('/stats/');

    chai.expect(res).to.have.status(200);
    chai.expect(res.body).to.have.property('count_mutant_dna').to.be.equal(0);
    chai.expect(res.body).to.have.property('count_human_dna').to.be.equal(0);
    chai.expect(res.body).to.have.property('ratio').to.be.equal(0);

    await post('/mutant/', {dna: VALID_MATRICES.sample_1});

    res = await chai.request(app).get('/stats/');

    chai.expect(res).to.have.status(200);
    chai.expect(res.body).to.have.property('count_mutant_dna').to.be.equal(1);
    chai.expect(res.body).to.have.property('count_human_dna').to.be.equal(0);
    chai.expect(res.body).to.have.property('ratio').to.be.equal(0);

    await post('/mutant/', {dna: INVALID_MATRICES.sample_0});
    await post('/mutant/', {dna: INVALID_MATRICES.sample_0});

    res = await chai.request(app).get('/stats/');

    chai.expect(res).to.have.status(200);
    chai.expect(res.body).to.have.property('count_mutant_dna').to.be.equal(1);
    chai.expect(res.body).to.have.property('count_human_dna').to.be.equal(1);
    chai.expect(res.body).to.have.property('ratio').to.be.equal(1);

  });
});