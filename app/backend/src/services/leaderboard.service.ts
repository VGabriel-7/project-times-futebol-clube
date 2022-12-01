import { IReturnFilterTimeRatings } from '../interfaces';
import User from '../database/models/UserModel';
import Team from '../database/models/TeamModel';
import Match from '../database/models/MatchModel';

type team = 'teamHome' | 'teamAway';
type teamGoals = 'homeTeamGoals' | 'awayTeamGoals';

export default class LeaderboardService {
  private _user = User;
  private _matches: Match[] = [];
  private _teams: Team[] = [];
  static async teams() {
    return Team.findAll();
  }

  static async matches() {
    return Match.findAll({
      where: { inProgress: false },
      include: [
        { model: Team, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: Team, as: 'teamAway', attributes: { exclude: ['id'] } },
      ],
    });
  }

  private calcTotalPoints(
    teamName: string,
    team: team,
    teamGoals: teamGoals,
    teamGoals2: teamGoals,
  ): number {
    let points = 0;
    this._matches.forEach((match: Match) => {
      if (teamName === match[team].teamName) {
        if (match[teamGoals] > match[teamGoals2]) points += 3;
        if (match[teamGoals] === match[teamGoals2]) points += 1;
      }
    });
    return points;
  }

  private calcTotalGames(teamName: string, team: team): number {
    let games = 0;
    this._matches.forEach((match: Match) => {
      if (teamName === match[team].teamName) {
        games += 1;
      }
    });
    return games;
  }

  private calcTotalWins(
    teamName: string,
    team: team,
    teamGoals: teamGoals,
    teamGoals2: teamGoals,
  ): number {
    let victories = 0;
    this._matches.forEach((match: Match) => {
      if (teamName === match[team].teamName && match[teamGoals] > match[teamGoals2]) {
        victories += 1;
      }
    });
    return victories;
  }

  private calcTotalDraws(
    teamName: string,
    team: team,
    teamGoals: teamGoals,
    teamGoals2: teamGoals,
  ): number {
    let draws = 0;
    this._matches.forEach((match: Match) => {
      if (teamName === match[team].teamName && match[teamGoals] === match[teamGoals2]) {
        draws += 1;
      }
    });
    return draws;
  }

  private calcTotalLosses(
    teamName: string,
    team: team,
    teamGoals: teamGoals,
    teamGoals2: teamGoals,
  ): number {
    let losses = 0;
    this._matches.forEach((match: Match) => {
      if (teamName === match[team].teamName && match[teamGoals] < match[teamGoals2]) {
        losses += 1;
      }
    });
    return losses;
  }

  private calcTotalGoalsFavor(
    teamName: string,
    team: team,
    teamGoals: teamGoals,
  ): number {
    let goalsFavor = 0;
    this._matches.forEach((match: Match) => {
      if (teamName === match[team].teamName) {
        goalsFavor += match[teamGoals];
      }
    });
    return goalsFavor;
  }

  private calcTotalGoalsOwn(teamName: string, team: team, teamGoals: teamGoals): number {
    let goalsOwn = 0;
    this._matches.forEach((match: Match) => {
      if (teamName === match[team].teamName) {
        goalsOwn += match[teamGoals];
      }
    });
    return goalsOwn;
  }

  private calcGoalsBalance(
    teamName: string,
    team: team,
    teamGoals: teamGoals,
    teamGoals2: teamGoals,
  ): number {
    return this.calcTotalGoalsFavor(teamName, team, teamGoals)
    - this.calcTotalGoalsOwn(teamName, team, teamGoals2);
  }

  private calcEfficiency(
    teamName: string,
    team: team,
    teamGoals: teamGoals,
    teamGoals2: teamGoals,
  ): number {
    const totalPoint = this.calcTotalPoints(teamName, team, teamGoals, teamGoals2);
    const totalGames = this.calcTotalGames(teamName, team);

    return Number(((totalPoint / (totalGames * 3)) * 100).toFixed(2));
  }

  static reorder(array: IReturnFilterTimeRatings[]) {
    return array.sort((a, b) => (
      b.totalPoints - a.totalPoints || b.totalVictories - a.totalVictories
      || b.goalsBalance - a.goalsBalance
      || b.goalsFavor - a.goalsFavor || a.goalsOwn - b.goalsOwn));
  }

  private async overAllTeams(
    team: team,
    homeTeam: teamGoals,
    homeTeam2: teamGoals,
  ): Promise<IReturnFilterTimeRatings[]> {
    this._teams = await LeaderboardService.teams();
    this._matches = await LeaderboardService.matches();
    const arrayOverAllHome = LeaderboardService.reorder(this._teams.map(({ teamName }) => ({
      name: teamName,
      totalPoints: this.calcTotalPoints(teamName, team, homeTeam, homeTeam2),
      totalGames: this.calcTotalGames(teamName, team),
      totalVictories: this.calcTotalWins(teamName, team, homeTeam, homeTeam2),
      totalDraws: this.calcTotalDraws(teamName, team, homeTeam, homeTeam2),
      totalLosses: this.calcTotalLosses(teamName, team, homeTeam, homeTeam2),
      goalsFavor: this.calcTotalGoalsFavor(teamName, team, homeTeam),
      goalsOwn: this.calcTotalGoalsOwn(teamName, team, homeTeam2),
      goalsBalance: this.calcGoalsBalance(teamName, team, homeTeam, homeTeam2),
      efficiency: this.calcEfficiency(teamName, team, homeTeam, homeTeam2) })));

    return arrayOverAllHome;
  }

  public async overAll(team: string | undefined): Promise<IReturnFilterTimeRatings[]> {
    if (team === 'teamHome') {
      return this.overAllTeams(team, 'homeTeamGoals', 'awayTeamGoals');
    }
    return this.overAllTeams('teamAway', 'awayTeamGoals', 'homeTeamGoals');
  }
}
