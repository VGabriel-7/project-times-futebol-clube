export const responseLeaderboardHome = [
  {
    name: 'Internacional',
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
]

export const returnFindAllTeams = [
  {
    id: 9,
    teamName: 'Internacional'
  },
  {
    id: 16,
    teamName: 'São Paulo'
  }
]

export const returnFindAllMatches = [
  {
    id: 1,
    homeTeam: 16,
    homeTeamGoals: 1,
    awayTeam: 8,
    awayTeamGoals: 1,
    inProgress: false,
    teamHome: {
      teamName: 'São Paulo'
    },
    teamAway: {
      teamName: 'Grêmio'
    }
  },
  {
    id: 2,
    homeTeam: 9,
    homeTeamGoals: 1,
    awayTeam: 14,
    awayTeamGoals: 1,
    inProgress: false,
    teamHome: {
      teamName: 'Internacional'
    },
    teamAway: {
      teamName: 'Santos'
    }
  }
]
