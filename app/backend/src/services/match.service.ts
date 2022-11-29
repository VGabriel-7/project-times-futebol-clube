import { IReturnPutMatches, IParamsUpdateMatches } from '../interfaces';
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
    const matches = await Match.findAll({
      include: [
        { model: Team, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: Team, as: 'teamAway', attributes: { exclude: ['id'] } },
      ],
    });

    const matchesInProgress = matches.filter((match) => !match.inProgress);

    return matchesInProgress;
  }

  public static async updateMatch({
    homeTeam,
    awayTeam,
    homeTeamGoals,
    awayTeamGoals,
  }: IParamsUpdateMatches):
    Promise<IReturnPutMatches> {
    const { dataValues } = await Match.create({
      homeTeam,
      awayTeam,
      homeTeamGoals,
      awayTeamGoals,
      inProgress: 1,
    });

    return dataValues;
  }
}
