import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import App from '../app';
import Match from '../database/models/MatchModel';

import { Response } from 'superagent';
import { responseMatches, matchesInProgress } from './mocks/mockMatches';
import { IResponseMatches } from '../interfaces';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

const HTTP_STATUS_OK = 200;
const HTTP_NOT_FOUND = 404;
// const HTTP_BAD_REQUEST = 400;
// const HTTP_UNAUTHORIZED = 401;

describe('Rota de Matches', () => {

  let chaiHttpResponse: Response;

  beforeEach(async () => {
    sinon
      .stub(Match, "findAll")
      .resolves(responseMatches as IResponseMatches[]);
  });

  afterEach(sinon.restore)

  it('Retorna um array de partidas e status 200 ao fazer a requisicao na rota /matches', async () => {
    chaiHttpResponse = await chai.request(app).get('/matches');

    expect(chaiHttpResponse.status).to.be.eq(HTTP_STATUS_OK);
    expect(chaiHttpResponse.body).to.deep.equal(responseMatches);
  });
});

describe('Rota de Matches com query', () => {

  let chaiHttpResponse: Response;

  beforeEach(async () => {
    sinon
      .stub(Match, "findAll")
      .resolves(matchesInProgress as IResponseMatches[]);
  });

  afterEach(sinon.restore)

  it('Retorna um array de partidas em progresso e status 200 ao fazer a requisicao na rota /matches?inProgress=true', async () => {
    chaiHttpResponse = await chai.request(app).get('/matches').query({ inProgress: true });

    expect(chaiHttpResponse.status).to.be.eq(HTTP_STATUS_OK);
    expect(chaiHttpResponse.body).to.deep.equal(matchesInProgress);
  });
});
