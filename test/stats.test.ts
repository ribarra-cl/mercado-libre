/*
  Project. Tech Leader Test
  Author. Richard Ibarra Ramírez - richard.ibarra@gmail.com
 */

import {expect} from 'chai';
import chai = require('chai');
import chaiHttp = require('chai-http');

const {MongoMemoryServer} = require('mongodb-memory-server');
import App from '../src/app';
import {Application} from "express";
import {VALID_MATRICES} from "../mocks/mutants.mock";

// setup chai for testing
chai.use(chaiHttp);
chai.should();

describe('/stats', () => {

  let app: Application;

  before(async () => {
    // setup mongo in memory server
    const mongod = new MongoMemoryServer();
    const mongoURL = await mongod.getConnectionString();

    app = new App(mongoURL).app;
  });

  it('stats tests', async () => {

    let res = await chai.request(app).get('/stats/');

    expect(res).to.have.status(200);
    expect(res.body).to.have.property('count_mutant_dna').to.be.equal(0);
    expect(res.body).to.have.property('count_human_dna').to.be.equal(0);
    expect(res.body).to.have.property('ratio').to.be.equal(0);

    await chai.request(app)
      .post('/mutants/')
      .set('content-type', 'application/json')
      .send({dna: VALID_MATRICES.sample_1});

    res = await chai.request(app).get('/stats/');

    expect(res).to.have.status(200);
    expect(res.body).to.have.property('count_mutant_dna').to.be.equal(1);
    expect(res.body).to.have.property('count_human_dna').to.be.equal(0);
    expect(res.body).to.have.property('ratio').to.be.equal(0);

  });
});