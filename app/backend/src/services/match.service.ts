import {
  IReturnPutMatches,
  IParamsCreateMatches,
  IReturnUpdateMatches,
  IParamsUpdateMatchInProgress,
  IReturnMatchInProgress,
} from '../interfaces';
import Match from '../database/models/MatchModel';
import Team from '../database/models/TeamModel';

export default class MatchService {
  private _match = Match;

  public async getAllMatches(): Promise<Match[]> {
    const matches = await this._match.findAll({
      include: [
        { model: Team, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: Team, as: 'teamAway', attributes: { exclude: ['id'] } },
      ],
    });

    return matches;
  }

  public async getAllMatchesInProgress(): Promise<Match[]> {
    const matches = await this._match.findAll({
      include: [
        { model: Team, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: Team, as: 'teamAway', attributes: { exclude: ['id'] } },
      ],
    });

    const matchesInProgress = matches.filter((match) => match.inProgress);

    return matchesInProgress;
  }

  public async getAllClosedMatches(): Promise<Match[]> {
    const closedMatches = await this._match.findAll({
      where: { inProgress: false },
      include: [
        { model: Team, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: Team, as: 'teamAway', attributes: { exclude: ['id'] } },
      ],
    });

    return closedMatches;
  }

  public async createMatch({
    homeTeam,
    awayTeam,
    homeTeamGoals,
    awayTeamGoals,
  }: IParamsCreateMatches):
    Promise<IReturnPutMatches> {
    const dataValues = await this._match.create({
      homeTeam,
      awayTeam,
      homeTeamGoals,
      awayTeamGoals,
      inProgress: 1,
    });

    return dataValues;
  }

  public async endMatch(id: number):
  Promise<IReturnUpdateMatches | boolean> {
    const finshedMatch = await this._match.update({ inProgress: 0 }, {
      where: { id },
    });

    if (finshedMatch[0] === 1) return { message: 'Finished' };

    return false;
  }

  public async updateMatchInProgress(id: number, updates: IParamsUpdateMatchInProgress):
  Promise<IReturnMatchInProgress | boolean> {
    const { homeTeamGoals, awayTeamGoals } = updates;

    const updatedMatch = await this._match.update({ homeTeamGoals, awayTeamGoals }, {
      where: { id },
    });

    if (updatedMatch[0] === 1) return { message: 'Match updated' };

    return false;
  }
}
