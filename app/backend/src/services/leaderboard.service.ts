import { IReturnFilterTimeRatings } from '../interfaces';
import User from '../database/models/UserModel';
import Team from '../database/models/TeamModel';
import Match from '../database/models/MatchModel';

type team = 'teamHome' | 'teamAway';
type teamGoals = 'homeTeamGoals' | 'awayTeamGoals';

type Keys = 'totalPoints' |
'totalGames' |
'totalVictories' |
'totalDraws' |
'totalLosses' |
'goalsFavor' |
'goalsOwn' |
'goalsBalance' |
'efficiency';

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

  static genericKeyCalc(teams: IReturnFilterTimeRatings[], key: Keys, name: string): number {
    return teams.reduce((acc, team) => (team.name === name ? acc + team[key] : acc + 0), 0);
  }

  static removeDuplication(array: IReturnFilterTimeRatings[]): IReturnFilterTimeRatings[] {
    const setTeam = new Set();

    const arrayWithoutDuplication = array.filter((team) => {
      const duplicatedPerson = setTeam.has(team.name);
      setTeam.add(team.name);
      return !duplicatedPerson;
    });

    return arrayWithoutDuplication;
  }

  static calcEfficiencyOverAll(teams: IReturnFilterTimeRatings[], name: string): number {
    const totalGames = LeaderboardService.genericKeyCalc(teams, 'totalGames', name);
    const totalPoints = LeaderboardService.genericKeyCalc(teams, 'totalPoints', name);
    return Number(((totalPoints / (totalGames * 3)) * 100).toFixed(2));
  }

  public async overAllHomeAndAway(): Promise<IReturnFilterTimeRatings[]> {
    const teamsHome = await this.overAllTeams('teamHome', 'homeTeamGoals', 'awayTeamGoals');
    const teamsAway = await this.overAllTeams('teamAway', 'awayTeamGoals', 'homeTeamGoals');
    const teams = [...teamsHome, ...teamsAway];
    const overAllTeams = teams.reduce((acc, team) => {
      const objTeam = { name: team.name,
        totalPoints: LeaderboardService.genericKeyCalc(teams, 'totalPoints', team.name),
        totalGames: LeaderboardService.genericKeyCalc(teams, 'totalGames', team.name),
        totalVictories: LeaderboardService.genericKeyCalc(teams, 'totalVictories', team.name),
        totalDraws: LeaderboardService.genericKeyCalc(teams, 'totalDraws', team.name),
        totalLosses: LeaderboardService.genericKeyCalc(teams, 'totalLosses', team.name),
        goalsFavor: LeaderboardService.genericKeyCalc(teams, 'goalsFavor', team.name),
        goalsOwn: LeaderboardService.genericKeyCalc(teams, 'goalsOwn', team.name),
        goalsBalance: LeaderboardService.genericKeyCalc(teams, 'goalsBalance', team.name),
        efficiency: LeaderboardService.calcEfficiencyOverAll(teams, team.name) };
      return [...acc, objTeam];
    }, [] as IReturnFilterTimeRatings[]);
    return LeaderboardService.reorder(LeaderboardService.removeDuplication(overAllTeams));
  }

  public async overAll(team: team | undefined): Promise<IReturnFilterTimeRatings[]> {
    if (team === 'teamHome') {
      return this.overAllTeams(team, 'homeTeamGoals', 'awayTeamGoals');
    } if (team === 'teamAway') {
      return this.overAllTeams(team, 'awayTeamGoals', 'homeTeamGoals');
    }
    return this.overAllHomeAndAway();
  }
}
