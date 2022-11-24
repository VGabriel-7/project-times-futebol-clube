import Team from '../database/models/TeamModel';

interface ITeams {
  id: number;
  teamName: string;
}

export default class TeamService {
  public static async getAllTeams(): Promise<ITeams[]> {
    const teams = await Team.findAll();

    return teams;
  }
}
