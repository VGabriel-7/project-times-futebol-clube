import { Request, Response } from 'express';
import TeamService from '../services/team.service';

export default class TeamController {
  public static async getAllTeams(req: Request, res: Response) {
    const teams = await TeamService.getAllTeams();

    return res.status(200).json(teams);
  }
}
