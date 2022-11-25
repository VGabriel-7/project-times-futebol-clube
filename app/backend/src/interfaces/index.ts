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
