import * as express from 'express';
import { TeamController } from '../controllers';

const route = express.Router();

route.get('/', TeamController.getAllTeams);

route.get('/:id', TeamController.getTeam);

export default route;
