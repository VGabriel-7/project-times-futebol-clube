import * as express from 'express';
import { MatchController } from '../controllers';

const route = express.Router();

route.get('/', MatchController.getAllMatches);

route.post('/', MatchController.createMatch);

route.patch('/:id/finish', MatchController.endMatch);

export default route;
