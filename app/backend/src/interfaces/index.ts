import Match from '../database/models/MatchModel';

export interface IJwt {
  id: number;
  username: string;
  role: string;
  email: string;
}

export interface IToken {
  data: {
    id: number;
    username: string;
    role: string;
    email: string;
  };
  iat: number;
  exp: number;
}

export interface IRole { role: string; }

export interface IResponseMatches extends Match {
  teamHome: object,
  teamAway: object,
}

export interface IBodyPutMatches {
  homeTeam: number;
  awayTeam: number;
  homeTeamGoals: number;
  awayTeamGoals: number;
}

export interface IReturnPutMatches {
  id: number;
  homeTeam: number;
  homeTeamGoals: number;
  awayTeam: number;
  awayTeamGoals: number;
  inProgress: boolean;
}

export interface IUserLogin {
  email: string;
  password: string;
}

export interface IUserService {
  login(userLogin: IUserLogin): Promise<IJwt | boolean>
  typeUser(id: number): Promise<IRole | null>
}

export interface IParamsCreateMatches {
  id: number;
  homeTeam: number;
  awayTeam: number;
  homeTeamGoals: number;
  awayTeamGoals: number;
}

export interface IReturnUpdateMatches { message: string }

export interface IParamsUpdateMatchInProgress {
  homeTeamGoals: string;
  awayTeamGoals: string;
}

export interface IReturnMatchInProgress {
  message: string;
}
