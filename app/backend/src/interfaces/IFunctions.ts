import Match from '../database/models/MatchModel';
import {
  IJwt,
  IParamsCreateMatches,
  IParamsUpdateMatchInProgress,
  IReturnFilterTimeRatings,
  IReturnMatchInProgress,
  IReturnPutMatches,
  IReturnUpdateMatches,
  IRole,
  ITeams,
  IUserLogin,
} from '.';

export interface IUserService {
  login(userLogin: IUserLogin): Promise<IJwt | boolean>
  typeUser(id: number): Promise<IRole | null>
}

export interface ILeaderboardService {
  overAll(team: string | undefined): Promise<IReturnFilterTimeRatings[]>
}

export interface ITeamService {
  getAllTeams(): Promise<ITeams[]>
  getTeam(id: number): Promise<ITeams | null>
}

export interface IMatchService {
  getAllMatches(): Promise<Match[]>
  getAllMatchesInProgress(): Promise<Match[]>
  getAllClosedMatches(): Promise<Match[]>
  createMatch({
    homeTeam,
    awayTeam,
    homeTeamGoals,
    awayTeamGoals,
  }: IParamsCreateMatches): Promise<IReturnPutMatches>
  endMatch(id: number): Promise<IReturnUpdateMatches | boolean>
  updateMatchInProgress(id: number, updates: IParamsUpdateMatchInProgress):
  Promise<IReturnMatchInProgress | boolean>
}
