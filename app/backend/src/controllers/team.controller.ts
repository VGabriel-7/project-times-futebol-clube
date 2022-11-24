import { Request, Response } from 'express';
import TeamService from '../services/team.service';

export default class TeamController {
  public static async getAllTeams(req: Request, res: Response) {
    const teams = await TeamService.getAllTeams();

    return res.status(200).json(teams);
  }

  public static async getTeam(req: Request, res: Response) {
    const { id } = req.params;

    const team = await TeamService.getTeam(Number(id));

    if (!team) return res.status(404).json({ message: 'Team not found' });

    return res.status(200).json(team);
  }
}
