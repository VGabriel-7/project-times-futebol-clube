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
}
