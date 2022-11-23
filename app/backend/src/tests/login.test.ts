import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import App from '../app';
import User from '../database/models/UserModel';
import mockBodyLogin from './mocks/bodyLogin';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

describe('Seu teste', () => {
  /**
   * Exemplo do uso de stubs com tipos
  */

  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(User, "findOne")
      .resolves(mockBodyLogin as User);
  });

  after(()=>{
    (User.findOne as sinon.SinonStub).restore();
  })

  it('...', async () => {
    chaiHttpResponse = await chai.request(app).post('/login').send(mockBodyLogin);

    expect(chaiHttpResponse.body).to.be.eq(mockBodyLogin);
  });

  it('Seu sub-teste', () => {
    expect(false).to.be.eq(true);
  });
});
