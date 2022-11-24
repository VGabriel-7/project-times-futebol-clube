import * as express from 'express';
import { TeamController } from '../controllers';

const route = express.Router();

route.get('/', TeamController.getAllTeams);

export default route;
