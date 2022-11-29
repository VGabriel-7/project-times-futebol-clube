import * as express from 'express';
import { MatchMiddleware } from '../middlewares';
import { MatchController } from '../controllers';

const route = express.Router();

route.get('/', MatchController.getAllMatches);

route.post(
  '/',
  MatchMiddleware.verifyToken,

  MatchMiddleware.verifyInfoToCreateMatch,

  MatchController.createMatch,
);

route.patch('/:id', MatchController.updateMatchInProgress);

route.patch('/:id/finish', MatchController.endMatch);

export default route;
