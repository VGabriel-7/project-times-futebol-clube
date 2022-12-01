export const responseLeaderboardHome = [
  {
    name: 'Internacional',
    totalPoints: 6,
    totalGames: 1,
    totalVictories: 2,
    totalDraws: 0,
    totalLosses: 0,
    goalsFavor: 2,
    goalsOwn: 1,
    goalsBalance: 1,
    efficiency: 100
  },
  {
    name: "São Paulo",
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
    awayTeam: 14,
    awayTeamGoals: 0,
    inProgress: false,
    teamHome: { teamName: 'Internacional' },
    teamAway: { teamName: 'Botafogo' }
  },
  {
    id: 3,
    homeTeam: 0,
    homeTeamGoals: 1,
    awayTeam: 14,
    awayTeamGoals: 50,
    inProgress: false,
    teamHome: { teamName: 'Flamengo' },
    teamAway: { teamName: 'Santos' }
  }
]
