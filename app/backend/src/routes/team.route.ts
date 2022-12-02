import * as express from 'express';
import { TeamController } from '../controllers';
import TeamService from '../services/team.service';

const route = express.Router();

const teamService = new TeamService();

const teamController = new TeamController(teamService);

route.get('/', teamController.getAllTeams.bind(teamController));

route.get('/:id', teamController.getTeam.bind(teamController));

export default route;
