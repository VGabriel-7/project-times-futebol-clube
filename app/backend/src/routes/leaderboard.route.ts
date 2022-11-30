import * as express from 'express';
import LeaderboardService from '../services/leaderboard.service';
import { LeaderboardController } from '../controllers';

const route = express.Router();

const leaderboardService = new LeaderboardService();

const leaderboardController = new LeaderboardController(leaderboardService);

route.get('/home', leaderboardController.overAll.bind(leaderboardController));

export default route;
