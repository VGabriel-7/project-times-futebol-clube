import { Request, Response } from 'express';
import { ITeamService } from '../interfaces/IFunctions';

export default class TeamController {
  constructor(private teamService: ITeamService) {}

  public async getAllTeams(req: Request, res: Response) {
    const teams = await this.teamService.getAllTeams();

    return res.status(200).json(teams);
  }

  public async getTeam(req: Request, res: Response) {
    const { id } = req.params;

    const team = await this.teamService.getTeam(Number(id));

    if (!team) return res.status(404).json({ message: 'Team not found' });

    return res.status(200).json(team);
  }
}
