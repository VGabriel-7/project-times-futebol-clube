import { Request, Response } from 'express';
import { IMatchService } from '../interfaces/IFunctions';
import { validateTk } from '../utils';

export default class MatchController {
  constructor(private matchService: IMatchService) {}

  public async getAllMatches(req: Request, res: Response) {
    const { inProgress } = req.query;

    try {
      if (inProgress === 'true') {
        const matchesInProgress = await this.matchService.getAllMatchesInProgress();

        return res.status(200).json(matchesInProgress);
      } if (inProgress === 'false') {
        const closedMatches = await this.matchService.getAllClosedMatches();

        return res.status(200).json(closedMatches);
      }

      const matches = await this.matchService.getAllMatches();

      return res.status(200).json(matches);
    } catch (err) {
      res.status(500).json({ message: err });
    }
  }

  public async createMatch(req: Request, res: Response) {
    const { authorization } = req.headers;

    try {
      validateTk(authorization as string);

      const matches = await this.matchService.createMatch(req.body);

      return res.status(201).json(matches);
    } catch ({ message }) {
      if (message === 'Invalid token') return res.status(400).json({ message });
      return res.status(500).json({ message });
    }
  }

  public async endMatch(req: Request, res: Response) {
    const { id } = req.params;

    const finshedMatch = await this.matchService.endMatch(Number(id));

    if (!finshedMatch) return res.status(400).json({ message: 'Match not found' });

    return res.status(200).json(finshedMatch);
  }

  public async updateMatchInProgress(req: Request, res: Response) {
    const { id } = req.params;

    const updatedMatch = await this.matchService.updateMatchInProgress(Number(id), req.body);

    if (!updatedMatch) return res.status(404).json({ message: 'Match not found' });

    return res.status(200).json(updatedMatch);
  }
}
