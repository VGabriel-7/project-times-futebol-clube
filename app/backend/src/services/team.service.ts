import { ITeams } from '../interfaces';
import Team from '../database/models/TeamModel';

export default class TeamService {
  private _team = Team;

  public async getAllTeams(): Promise<ITeams[]> {
    const teams = await this._team.findAll();

    return teams;
  }

  public async getTeam(id: number): Promise<ITeams | null> {
    const team = await this._team.findByPk(id);

    return team;
  }
}
