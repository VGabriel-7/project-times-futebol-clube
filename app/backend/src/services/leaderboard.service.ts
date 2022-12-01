import { IReturnFilterTimeRatings } from '../interfaces';
import User from '../database/models/UserModel';
import Team from '../database/models/TeamModel';
import Match from '../database/models/MatchModel';

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

  private calculateTotalPoints(teamName: string): number {
    let points = 0;
    this._matches.forEach((match: Match) => {
      if (teamName === match.teamHome.teamName) {
        if (match.homeTeamGoals > match.awayTeamGoals) points += 3;
        if (match.homeTeamGoals === match.awayTeamGoals) points += 1;
      }
    });
    return points;
  }

  private calculateTotalGames(teamName: string): number {
    let games = 0;
    this._matches.forEach((match: Match) => {
      if (teamName === match.teamHome.teamName) {
        games += 1;
      }
    });
    return games;
  }

  private calculateTotalVictories(teamName: string): number {
    let victories = 0;
    this._matches.forEach((match: Match) => {
      if (teamName === match.teamHome.teamName && match.homeTeamGoals > match.awayTeamGoals) {
        victories += 1;
      }
    });
    return victories;
  }

  private calculateTotalDraws(teamName: string): number {
    let draws = 0;
    this._matches.forEach((match: Match) => {
      if (teamName === match.teamHome.teamName && match.homeTeamGoals === match.awayTeamGoals) {
        draws += 1;
      }
    });
    return draws;
  }

  private calculateTotalLosses(teamName: string): number {
    let losses = 0;
    this._matches.forEach((match: Match) => {
      if (teamName === match.teamHome.teamName && match.homeTeamGoals < match.awayTeamGoals) {
        losses += 1;
      }
    });
    return losses;
  }

  private calculateTotalGoalsFavor(teamName: string): number {
    let goalsFavor = 0;
    this._matches.forEach((match: Match) => {
      if (teamName === match.teamHome.teamName) {
        goalsFavor += match.homeTeamGoals;
      }
    });
    return goalsFavor;
  }

  private calculateTotalGoalsOwn(teamName: string): number {
    let goalsOwn = 0;
    this._matches.forEach((match: Match) => {
      if (teamName === match.teamHome.teamName) {
        goalsOwn += match.awayTeamGoals;
      }
    });
    return goalsOwn;
  }

  private calculateGoalsBalance(teamName: string): number {
    return this.calculateTotalGoalsFavor(teamName)
    - this.calculateTotalGoalsOwn(teamName);
  }

  private calculateEfficiency(teamName: string): number {
    const totalPoint = this.calculateTotalPoints(teamName);
    const totalGames = this.calculateTotalGames(teamName);

    // [P / (J * 3)] * 100

    return Number(((totalPoint / (totalGames * 3)) * 100).toFixed(2));
  }

  public async overAll(): Promise<IReturnFilterTimeRatings[]> {
    this._teams = await LeaderboardService.teams();
    this._matches = await LeaderboardService.matches();
    const arrayOverAll = this._teams.map(({ teamName }) => ({
      name: teamName,
      totalPoints: this.calculateTotalPoints(teamName),
      totalGames: this.calculateTotalGames(teamName),
      totalVictories: this.calculateTotalVictories(teamName),
      totalDraws: this.calculateTotalDraws(teamName),
      totalLosses: this.calculateTotalLosses(teamName),
      goalsFavor: this.calculateTotalGoalsFavor(teamName),
      goalsOwn: this.calculateTotalGoalsOwn(teamName),
      goalsBalance: this.calculateGoalsBalance(teamName),
      efficiency: this.calculateEfficiency(teamName),
    })).sort((a, b) => (
      b.totalPoints - a.totalPoints || b.totalVictories - a.totalVictories
      || b.goalsBalance - a.goalsBalance
      || b.goalsFavor - a.goalsFavor || a.goalsOwn - b.goalsOwn));

    return arrayOverAll;
  }
}

const leaderboard = new LeaderboardService();

leaderboard.overAll();
