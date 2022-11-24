import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import App from '../app';
import Team from '../database/models/TeamModel';
import * as bcrypt from 'bcryptjs';

import { Response } from 'superagent';
import { bodyTeams } from './mocks/bodyTeams';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

const HTTP_STATUS_OK = 200;
const HTTP_NOT_FOUND = 404;
// const HTTP_BAD_REQUEST = 400;
// const HTTP_UNAUTHORIZED = 401;

describe('Rota de Teams', () => {

  let chaiHttpResponse: Response;

  beforeEach(async () => {
    sinon
      .stub(Team, "findAll")
      .resolves(bodyTeams as Team[]);
  });

  afterEach(sinon.restore)

  it('Retorna um array com times e status 200 ao fazer a requisicao na rota /teams', async () => {
    chaiHttpResponse = await chai.request(app).get('/teams');

    expect(chaiHttpResponse.status).to.be.eq(HTTP_STATUS_OK);
    expect(chaiHttpResponse.body).to.deep.equal(bodyTeams);
  });

  it('Retorna um time e status 200 ao fazer a requisicao na rota /teams/:id', async () => {
    sinon
      .stub(Team, "findByPk")
      .resolves(bodyTeams[0] as Team);
    chaiHttpResponse = await chai.request(app).get('/teams/1');

    expect(chaiHttpResponse.status).to.be.eq(HTTP_STATUS_OK);
    expect(chaiHttpResponse.body).to.deep.equal(bodyTeams[0]);
  });

  it('Retorna { message: "Team not found" } e status 404 ao fazer a requisicao na rota /teams/:id', async () => {
    sinon
      .stub(Team, "findByPk")
      .resolves(null)
    chaiHttpResponse = await chai.request(app).get('/teams/99999');

    expect(chaiHttpResponse.status).to.be.eq(HTTP_NOT_FOUND);
    expect(chaiHttpResponse.body).to.deep.equal({ message: "Team not found" });
  });
});
