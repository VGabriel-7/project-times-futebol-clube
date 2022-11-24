import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import App from '../app';
import User from '../database/models/UserModel';
import {
  mockBodyLogin,
  mockReturnModelLogin,
  mockReturnModelAuth,
  mockHeadersLogin,
} from './mocks/bodyLogin';
import * as bcrypt from 'bcryptjs';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

describe('Rota de Login', () => {

  let chaiHttpResponse: Response;

  beforeEach(async () => {
    sinon
      .stub(User, "findOne")
      .resolves(mockReturnModelLogin as User);
  });

  afterEach(sinon.restore)

  it('Retorna um token e status 200 ao fazer login', async () => {
    sinon.stub(bcrypt, "compareSync").returns(true);
    chaiHttpResponse = await chai.request(app).post('/login').send(mockBodyLogin);

    expect(chaiHttpResponse.status).to.be.eq(200);
    expect(chaiHttpResponse.body.token).to.be.an('string');
  });

  it('Retorna "Incorrect email or password" e status 401 caso algum dos dados de login estejam invalidos', async () => {
    sinon.stub(bcrypt, "compareSync").returns(false);
    chaiHttpResponse = await chai.request(app).post('/login').send(mockBodyLogin);

    expect(chaiHttpResponse.status).to.be.eq(401);
    expect(chaiHttpResponse.body).to.deep.equal({ message: "Incorrect email or password" });
  });
});

describe('Rota de login/validate', () => {

  let chaiHttpResponse: Response;

  beforeEach(async () => {
    sinon
      .stub(User, "findByPk")
      .resolves(mockReturnModelAuth as User);
  });

  afterEach(sinon.restore)

  it('Retorna um token e status 200 ao fazer login', async () => {
    sinon.stub(bcrypt, "compareSync").returns(true);
    chaiHttpResponse = await chai.request(app).get('/login/validate').set({ Authorization: mockHeadersLogin.token });

    expect(chaiHttpResponse.status).to.be.eq(200);
    expect(chaiHttpResponse.body).to.deep.equal({ role: 'admin' });
  });
});
