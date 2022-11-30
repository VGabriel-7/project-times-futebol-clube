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
  returnPutMatches } from './mocks/mockMatches';
import * as JWT from '../utils/JWT'
import { mockJWTValidateTk, validToken } from './mocks/bodyLogin';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

const HTTP_STATUS_OK = 200;
const HTTP_CREATED = 201;
const HTTP_BAD_REQUEST = 400;
const HTTP_UNPROCESSABLE_ENTITY = 422;
const HTTP_NOT_FOUND = 404;
const HTTP_UNAUTHORIZED = 401;

describe('Rota /matches', () => {

  let chaiHttpResponse: Response;

  beforeEach(async () => {
    sinon
      .stub(Match, "findAll")
      .resolves(responseMatches as Match[]);
  });

  afterEach(sinon.restore)

  it('Retorna { message: Token must be a valid token } e status 401 ao fazer a requisicao sem um token de autorizacao', async () => {
    chaiHttpResponse = await chai.request(app).post('/matches').send({
      homeTeam: 16,
      awayTeam: 8,
      homeTeamGoals: 2,
      awayTeamGoals: 2
    });
    
    expect(chaiHttpResponse.status).to.be.eq(HTTP_UNAUTHORIZED);
    expect(chaiHttpResponse.body).to.deep.equal({ message: 'Token must be a valid token' });
  });

  it('Retorna um array de partidas e status 200', async () => {
    chaiHttpResponse = await chai.request(app).get('/matches');

    expect(chaiHttpResponse.status).to.be.eq(HTTP_STATUS_OK);
    expect(chaiHttpResponse.body).to.deep.equal(responseMatches);
  });

  it('Retorna os infos de um Match criado e status 201', async () => {
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

  it('Retorna uma mensagem de erro e status 422 com awayTem e homeTeam iguais', async () => {
    sinon
      .stub(JWT, "validateTk")
      .returns(mockJWTValidateTk);
    sinon
    .stub(Match, "create")
    .resolves(returnPutMatches as Match);
    chaiHttpResponse = await chai.request(app).post('/matches').set({ Authorization: validToken })
    .send({
      homeTeam: 16,
      awayTeam: 16,
      homeTeamGoals: 2,
      awayTeamGoals: 2 });

    expect(chaiHttpResponse.status).to.be.eq(HTTP_UNPROCESSABLE_ENTITY);
    expect(chaiHttpResponse.body).to.deep.equal({ message: 'It is not possible to create a match with two equal teams' });
  });

  it('Retorna uma mensagem de erro e status 404 com awayTem e homeTeam inexistentes', async () => {
    sinon
      .stub(JWT, "validateTk")
      .returns(mockJWTValidateTk);
    sinon
    .stub(Match, "create")
    .resolves(returnPutMatches as Match);
    chaiHttpResponse = await chai.request(app).post('/matches').set({ Authorization: validToken })
    .send({
      homeTeam: 999999,
      awayTeam: 16,
      homeTeamGoals: 2,
      awayTeamGoals: 2 });

    expect(chaiHttpResponse.status).to.be.eq(HTTP_NOT_FOUND);
    expect(chaiHttpResponse.body).to.deep.equal({ message: 'There is no team with such id!' });
  });
});

describe('Rota /matches/:id', () => {

  let chaiHttpResponse: Response;

  afterEach(sinon.restore)

  it('Retorna { message: Match updated } e status 200', async () => {
    sinon
    .stub(Match, "update")
    .resolves([1]);
    chaiHttpResponse = await chai.request(app).patch('/matches/1').send({
      homeTeamGoals: 3,
      awayTeamGoals: 1
    });

    expect(chaiHttpResponse.status).to.be.eq(HTTP_STATUS_OK);
    expect(chaiHttpResponse.body).to.deep.equal({ message: 'Match updated' });
  });

  it('Retorna { message: Match not found } status 404', async () => {
    sinon
    .stub(Match, "update")
    .resolves([0]);
    chaiHttpResponse = await chai.request(app).patch('/matches/99999').send({
      homeTeamGoals: 3,
      awayTeamGoals: 1
    });

    expect(chaiHttpResponse.status).to.be.eq(HTTP_NOT_FOUND);
    expect(chaiHttpResponse.body).to.deep.equal({ message: 'Match not found' });
  });
});

describe('Rota de /matches com query', () => {

  let chaiHttpResponse: Response;

  beforeEach(async () => {
    sinon
      .stub(Match, "findAll")
      .resolves(matchesInProgress as Match[]);
  });

  afterEach(()=>{
    (Match.findAll as sinon.SinonStub).restore();
  })

  it('Retorna um array de partidas em progresso e status 200 com a query ?inProgress=true', async () => {
    chaiHttpResponse = await chai.request(app).get('/matches').query({ inProgress: true });

    expect(chaiHttpResponse.status).to.be.eq(HTTP_STATUS_OK);
    expect(chaiHttpResponse.body).to.deep.equal(matchesInProgress);
  });

  it('Retorna um array de partidas encerradas e status 200 com a query ?inProgress=false', async () => {
    (Match.findAll as sinon.SinonStub).restore();
    sinon
      .stub(Match, "findAll")
      .resolves(matchesNotInProgress as Match[]);
    chaiHttpResponse = await chai.request(app).get('/matches').query({ inProgress: false });

    expect(chaiHttpResponse.status).to.be.eq(HTTP_STATUS_OK);
    expect(chaiHttpResponse.body).to.deep.equal(matchesNotInProgress);
  });
});

describe('Rota de /mtaches/:id/finish', () => {

  let chaiHttpResponse: Response;

  afterEach(()=>{
    (Match.update as sinon.SinonStub).restore();
  })

  it('Retorna { message: Finished } e status 200', async () => {
    sinon
      .stub(Match, "update")
      .resolves([1]);
    chaiHttpResponse = await chai.request(app).patch('/matches/1/finish');

    expect(chaiHttpResponse.status).to.be.eq(HTTP_STATUS_OK);
    expect(chaiHttpResponse.body).to.deep.equal({ message: 'Finished' });
  });

  it('Retorna { message: Match not found } e status 400 ao fazer a requisicao com um id inexistente', async () => {
    sinon
      .stub(Match, "update")
      .resolves([0]);
    chaiHttpResponse = await chai.request(app).patch('/matches/1/finish');

    expect(chaiHttpResponse.status).to.be.eq(HTTP_BAD_REQUEST);
    expect(chaiHttpResponse.body).to.deep.equal({ message: 'Match not found' });
  });
});
