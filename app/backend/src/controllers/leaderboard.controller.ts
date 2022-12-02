import { Request, Response } from 'express';
import { ILeaderboardService } from '../interfaces';

export default class LeaderboardController {
  constructor(private leaderboardService: ILeaderboardService) {}

  public async overAllHome(_req: Request, res: Response) {
    const overAllHome = await this.leaderboardService.overAll('teamHome');

    return res.status(200).json(overAllHome);
  }

  public async overAllAway(_req: Request, res: Response) {
    const overAllAway = await this.leaderboardService.overAll('teamAway');

    return res.status(200).json(overAllAway);
  }

  public async overAll(_req: Request, res: Response) {
    const overAll = await this.leaderboardService.overAll(undefined);

    return res.status(200).json(overAll);
  }
}
