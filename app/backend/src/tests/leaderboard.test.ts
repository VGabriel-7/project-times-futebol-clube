import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import App from '../app';

import { Response } from 'superagent';
import Team from '../database/models/TeamModel';
import {
  responseLeaderboardAway,
  responseLeaderboardHome,
  returnFindAllMatches,
  returnFindAllTeams,
  returnFindAllTeamsAway} from './mocks/mockLeaderboard';
import Match from '../database/models/MatchModel';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

const HTTP_STATUS_OK = 200;

describe('Rota de /leaderboard/home', () => {

  let chaiHttpResponse: Response;

  afterEach(sinon.restore)

  it('Retorna um array de classificacoes dos home teams e status 200', async () => {
    sinon
      .stub(Team, "findAll")
      .resolves(returnFindAllTeams as Team[]);
    sinon
      .stub(Match, "findAll")
      .resolves(returnFindAllMatches as Match[]);
    chaiHttpResponse = await chai.request(app).get('/leaderboard/home');

    expect(chaiHttpResponse.status).to.be.eq(HTTP_STATUS_OK);
    expect(chaiHttpResponse.body).to.deep.equal(responseLeaderboardHome);
  });

  it('Retorna um array de classificacoes dos away teams e status 200', async () => {
    sinon
      .stub(Team, "findAll")
      .resolves(returnFindAllTeamsAway as Team[]);
    sinon
      .stub(Match, "findAll")
      .resolves(returnFindAllMatches as Match[]);
    chaiHttpResponse = await chai.request(app).get('/leaderboard/away');

    expect(chaiHttpResponse.status).to.be.eq(HTTP_STATUS_OK);
    expect(chaiHttpResponse.body).to.deep.equal(responseLeaderboardAway);
  });
});
