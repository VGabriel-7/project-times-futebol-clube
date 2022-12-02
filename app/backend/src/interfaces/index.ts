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

export interface ITeams {
  id: number;
  teamName: string;
}

export interface IUserLogin {
  email: string;
  password: string;
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

export interface IReturnFilterTimeRatings {
  name: string;
  totalPoints: number;
  totalGames: number;
  totalVictories: number;
  totalDraws: number;
  totalLosses: number;
  goalsFavor: number;
  goalsOwn: number;
  goalsBalance: number;
  efficiency: number;
}
