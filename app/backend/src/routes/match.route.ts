import * as express from 'express';
import { MatchMiddleware } from '../middlewares';
import { MatchController } from '../controllers';
import TeamService from '../services/team.service';
import MatchService from '../services/match.service';

const route = express.Router();

const teamService = new TeamService();
const matchService = new MatchService();

const matchMiddleware = new MatchMiddleware(teamService);
const matchController = new MatchController(matchService);

route.get('/', matchController.getAllMatches.bind(matchController));

route.post(
  '/',
  MatchMiddleware.verifyToken,

  matchMiddleware.verifyInfoToCreateMatch.bind(matchMiddleware),

  matchController.createMatch.bind(matchController),
);

route.patch('/:id', matchController.updateMatchInProgress.bind(matchController));

route.patch('/:id/finish', matchController.endMatch.bind(matchController));

export default route;
