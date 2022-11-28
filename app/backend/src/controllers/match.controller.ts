import { Request, Response } from 'express';
import MatchService from '../services/match.service';

export default class MatchController {
  public static async getAllMatches(req: Request, res: Response) {
    const { inProgress } = req.query;

    try {
      if (inProgress === 'true') {
        const matchesInProgress = await MatchService.getAllMatchesInProgress();

        return res.status(200).json(matchesInProgress);
      } if (inProgress === 'false') {
        const closedMatches = await MatchService.getAllClosedMatches();

        return res.status(200).json(closedMatches);
      }

      const matches = await MatchService.getAllMatches();

      return res.status(200).json(matches);
    } catch (err) {
      res.status(500).json({ message: err });
    }
  }
}
