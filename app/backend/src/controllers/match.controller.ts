import { Request, Response } from 'express';
import MatchService from '../services/match.service';

export default class MatchController {
  public static async getAllMatches(req: Request, res: Response) {
    const matches = await MatchService.getAllMatches();

    return res.status(200).json(matches);
  }
}
