import { Request, Response } from 'express';
import { validateTk } from '../utils';
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

  public static async updateMatch(req: Request, res: Response) {
    const { authorization } = req.headers;

    if (!authorization) return res.status(400).json({ message: 'Token required for validation' });

    try {
      validateTk(authorization);

      const matches = await MatchService.updateMatch(req.body);

      return res.status(201).json(matches);
    } catch ({ message }) {
      if (message === 'Invalid token') return res.status(400).json({ message });
      res.status(500).json({ message });
    }
  }
}
