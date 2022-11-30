import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import App from '../app';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

const HTTP_STATUS_OK = 200;

describe('Rota de /leaderboard/home', () => {

  let chaiHttpResponse: Response;

  it('Retorna um array de classificacoes e status 200', async () => {
    chaiHttpResponse = await chai.request(app).get('/leaderboard/home');

    expect(chaiHttpResponse.status).to.be.eq(HTTP_STATUS_OK);
  });
});
