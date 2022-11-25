import * as express from 'express';
import { MatchController } from '../controllers';

const route = express.Router();

route.get('/', MatchController.getAllMatches);

export default route;
