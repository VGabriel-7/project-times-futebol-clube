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
  public static async getAllMatches(): Promise<Match[]> {
    const matches = await Match.findAll({
      include: [
        { model: Team, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: Team, as: 'teamAway', attributes: { exclude: ['id'] } },
      ],
    });

    return matches;
  }

  public static async getAllMatchesInProgress(): Promise<Match[]> {
    const matches = await Match.findAll({
      include: [
        { model: Team, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: Team, as: 'teamAway', attributes: { exclude: ['id'] } },
      ],
    });

    const matchesInProgress = matches.filter((match) => match.inProgress);

    return matchesInProgress;
  }

  public static async getAllClosedMatches(): Promise<Match[]> {
    const closedMatches = await Match.findAll({
      where: { inProgress: false },
      include: [
        { model: Team, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: Team, as: 'teamAway', attributes: { exclude: ['id'] } },
      ],
    });

    return closedMatches;
  }

  public static async createMatch({
    homeTeam,
    awayTeam,
    homeTeamGoals,
    awayTeamGoals,
  }: IParamsCreateMatches):
    Promise<IReturnPutMatches> {
    const dataValues = await Match.create({
      homeTeam,
      awayTeam,
      homeTeamGoals,
      awayTeamGoals,
      inProgress: 1,
    });

    return dataValues;
  }

  public static async endMatch(id: number):
  Promise<IReturnUpdateMatches | boolean> {
    const finshedMatch = await Match.update({ inProgress: 0 }, {
      where: { id },
    });

    if (finshedMatch[0] === 1) return { message: 'Finished' };

    return false;
  }

  public static async updateMatchInProgress(id: number, updates: IParamsUpdateMatchInProgress):
  Promise<IReturnMatchInProgress | boolean> {
    const { homeTeamGoals, awayTeamGoals } = updates;

    const updatedMatch = await Match.update({ homeTeamGoals, awayTeamGoals }, {
      where: { id },
    });

    if (updatedMatch[0] === 1) return { message: 'Match updated' };

    return false;
  }
}
