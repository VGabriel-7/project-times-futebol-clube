import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import App from '../app';
import Match from '../database/models/MatchModel';

import { Response } from 'superagent';
import {
  responseMatches,
  matchesInProgress,
  matchesNotInProgress,
  returnPutMatches,
  bodyPutMatches } from './mocks/mockMatches';
import { IResponseMatches, IReturnPutMatches } from '../interfaces';
import * as JWT from '../utils/JWT'
import { mockJWTValidateTk, validToken } from './mocks/bodyLogin';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

const HTTP_STATUS_OK = 200;
const HTTP_CREATED = 201;
const HTTP_BAD_REQUEST = 400;
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

  it('Retorna um array de partidas e status 201 ao fazer a requisicao na rota /matches', async () => {
    sinon
      .stub(JWT, "validateTk")
      .returns(mockJWTValidateTk);
    sinon
    .stub(Match, "create")
    .resolves(returnPutMatches as Match);
    chaiHttpResponse = await chai.request(app).post('/matches').set({ Authorization: validToken })
    .send({
      homeTeam: 16,
      awayTeam: 8,
      homeTeamGoals: 2,
      awayTeamGoals: 2 });

    expect(chaiHttpResponse.status).to.be.eq(HTTP_CREATED);
    expect(chaiHttpResponse.body).to.deep.equal(returnPutMatches);
  });

  it('Retorna { message: Token required for validation } e status 400 ao fazer a requisicao na rota /matches sem um token de autorizacao', async () => {
    chaiHttpResponse = await chai.request(app).post('/matches');

    expect(chaiHttpResponse.status).to.be.eq(HTTP_BAD_REQUEST);
    expect(chaiHttpResponse.body).to.deep.equal({ message: 'Token required for validation' });
  });
});

describe('Rota de Matches com query', () => {

  let chaiHttpResponse: Response;

  beforeEach(async () => {
    sinon
      .stub(Match, "findAll")
      .resolves(matchesInProgress as IResponseMatches[]);
  });

  afterEach(()=>{
    (Match.findAll as sinon.SinonStub).restore();
  })

  it('Retorna um array de partidas em progresso e status 200 ao fazer a requisicao na rota /matches?inProgress=true', async () => {
    chaiHttpResponse = await chai.request(app).get('/matches').query({ inProgress: true });

    expect(chaiHttpResponse.status).to.be.eq(HTTP_STATUS_OK);
    expect(chaiHttpResponse.body).to.deep.equal(matchesInProgress);
  });

  it('Retorna um array de partidas encerradas e status 200 ao fazer a requisicao na rota /matches?inProgress=false', async () => {
    (Match.findAll as sinon.SinonStub).restore();
    sinon
      .stub(Match, "findAll")
      .resolves(matchesNotInProgress as IResponseMatches[]);
    chaiHttpResponse = await chai.request(app).get('/matches').query({ inProgress: false });

    expect(chaiHttpResponse.status).to.be.eq(HTTP_STATUS_OK);
    expect(chaiHttpResponse.body).to.deep.equal(matchesNotInProgress);
  });
});

describe('Rota de Matches Finished', () => {

  let chaiHttpResponse: Response;

  afterEach(()=>{
    (Match.update as sinon.SinonStub).restore();
  })

  it('Retorna { message: Finished } e status 200 ao fazer a requisicao na rota /matches/:id/finish', async () => {
    sinon
      .stub(Match, "update")
      .resolves([1]);
    chaiHttpResponse = await chai.request(app).patch('/matches/1/finish');

    expect(chaiHttpResponse.status).to.be.eq(HTTP_STATUS_OK);
    expect(chaiHttpResponse.body).to.deep.equal({ message: 'Finished' });
  });

  it('Retorna { message: Match not found } e status 400 ao fazer a requisicao na rota /matches/:id/finish com um id inexistente', async () => {
    sinon
      .stub(Match, "update")
      .resolves([0]);
    chaiHttpResponse = await chai.request(app).patch('/matches/1/finish');

    expect(chaiHttpResponse.status).to.be.eq(HTTP_BAD_REQUEST);
    expect(chaiHttpResponse.body).to.deep.equal({ message: 'Match not found' });
  });
});
