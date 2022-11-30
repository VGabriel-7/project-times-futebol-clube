import { Request, Response } from 'express';
import { ILeaderboardService } from '../interfaces';

export default class LeaderboardController {
  constructor(private leaderboardService: ILeaderboardService) {}

  public async overAll(_req: Request, res: Response) {
    const overAll = await this.leaderboardService.overAll();

    return res.status(200).json(overAll);
  }
}
