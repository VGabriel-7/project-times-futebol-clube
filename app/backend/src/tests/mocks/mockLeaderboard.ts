export const responseLeaderboardHome = [
  {
    name: 'Internacional',
    totalPoints: 6,
    totalGames: 2,
    totalVictories: 2,
    totalDraws: 0,
    totalLosses: 0,
    goalsFavor: 2,
    goalsOwn: 0,
    goalsBalance: 2,
    efficiency: 100
  },
  {
    name: 'São Paulo',
    totalPoints: 1,
    totalGames: 1,
    totalVictories: 0,
    totalDraws: 1,
    totalLosses: 0,
    goalsFavor: 1,
    goalsOwn: 1,
    goalsBalance: 0,
    efficiency: 33.33
  },
  {
    name: 'Flamengo',
    totalPoints: 0,
    totalGames: 1,
    totalVictories: 0,
    totalDraws: 0,
    totalLosses: 1,
    goalsFavor: 0,
    goalsOwn: 50,
    goalsBalance: -50,
    efficiency: 0
  },
]

// [P / (J * 3)] * 100
// console.log((responseLeaderboardHome[2].totalPoints / (responseLeaderboardHome[2].totalGames * 3)) * 100);

export const returnFindAllTeams = [
  { id: 1, teamName: 'Internacional' },
  { id: 2, teamName: 'São Paulo' },
  { id: 3, teamName: 'Flamengo' }
]

export const returnFindAllMatches = [
  {
    id: 1,
    homeTeam: 1,
    homeTeamGoals: 1,
    awayTeam: 8,
    awayTeamGoals: 1,
    inProgress: false,
    teamHome: { teamName: 'São Paulo' },
    teamAway: { teamName: 'Grêmio' }
  },
  {
    id: 2,
    homeTeam: 1,
    homeTeamGoals: 1,
    awayTeam: 13,
    awayTeamGoals: 0,
    inProgress: false,
    teamHome: { teamName: 'Internacional' },
    teamAway: { teamName: 'Botafogo' }
  },
  {
    id: 2,
    homeTeam: 1,
    homeTeamGoals: 1,
    awayTeam: 13,
    awayTeamGoals: 0,
    inProgress: false,
    teamHome: { teamName: 'Internacional' },
    teamAway: { teamName: 'Botafogo' }
  },
  {
    id: 3,
    homeTeam: 3,
    homeTeamGoals: 0,
    awayTeam: 14,
    awayTeamGoals: 50,
    inProgress: false,
    teamHome: { teamName: 'Flamengo' },
    teamAway: { teamName: 'Santos' }
  }
]

export const returnFindAllTeamsAway = [
  { id: 8, teamName: 'Santos' },
  { id: 2, teamName: 'Grêmio' },
  { id: 13, teamName: 'Botafogo' }
]

export const responseLeaderboardAway = [
  {
    name: 'Santos',
    totalPoints: 3,
    totalGames: 1,
    totalVictories: 1,
    totalDraws: 0,
    totalLosses: 0,
    goalsFavor: 50,
    goalsOwn: 0,
    goalsBalance: 50,
    efficiency: 100
  },
  {
    name: 'Grêmio',
    totalPoints: 1,
    totalGames: 1,
    totalVictories: 0,
    totalDraws: 1,
    totalLosses: 0,
    goalsFavor: 1,
    goalsOwn: 1,
    goalsBalance: 0,
    efficiency: 33.33
  },
  {
    name: 'Botafogo',
    totalPoints: 0,
    totalGames: 2,
    totalVictories: 0,
    totalDraws: 0,
    totalLosses: 2,
    goalsFavor: 0,
    goalsOwn: 2,
    goalsBalance: -2,
    efficiency: 0
  },
]

export const returnFindAllTeamsLeaderboard = [...returnFindAllTeams, ...returnFindAllTeamsAway];

export const responseLeaderboard = [
  {
    efficiency: 100,
    goalsBalance: 2,
    goalsFavor: 2,
    goalsOwn: 0,
    name: 'Internacional',
    totalDraws: 0,
    totalGames: 2,
    totalLosses: 0,
    totalPoints: 6,
    totalVictories: 2,
  },
  {
    efficiency: 100,
    goalsBalance: 50,
    goalsFavor: 50,
    goalsOwn: 0,
    name: 'Santos',
    totalDraws: 0,
    totalGames: 1,
    totalLosses: 0,
    totalPoints: 3,
    totalVictories: 1,
  },
  {
    efficiency: 33.33,
    goalsBalance: 0,
    goalsFavor: 1,
    goalsOwn: 1,
    name: 'São Paulo',
    totalDraws: 1,
    totalGames: 1,
    totalLosses: 0,
    totalPoints: 1,
    totalVictories: 0,
  },
  {
    efficiency: 33.33,
    goalsBalance: 0,
    goalsFavor: 1,
    goalsOwn: 1,
    name: 'Grêmio',
    totalDraws: 1,
    totalGames: 1,
    totalLosses: 0,
    totalPoints: 1,
    totalVictories: 0,
  },
  {
    efficiency: 0,
    goalsBalance: -2,
    goalsFavor: 0,
    goalsOwn: 2,
    name: 'Botafogo',
    totalDraws: 0,
    totalGames: 2,
    totalLosses: 2,
    totalPoints: 0,
    totalVictories: 0,
  },
  {
    efficiency: 0,
    goalsBalance: -50,
    goalsFavor: 0,
    goalsOwn: 50,
    name: 'Flamengo',
    totalDraws: 0,
    totalGames: 1,
    totalLosses: 1,
    totalPoints: 0,
    totalVictories: 0,
  }
]


