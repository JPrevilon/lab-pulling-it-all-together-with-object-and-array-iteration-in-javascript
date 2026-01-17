function gameObject() {
    return {
        home: {
            teamName: "Brooklyn Nets",
            colors: ["Black", "White"],
            players: {
                "Alan Anderson": {
                    number: 0,
                    shoe: 16,
                    points: 22,
                    rebounds: 12,
                    assists: 12,
                    steals: 3,
                    blocks: 1,
                    slamDunks: 1,
                },
                "Reggie Evens": {
                    number: 30,
                    shoe: 14,
                    points: 12,
                    rebounds: 12,
                    assists: 12,
                    steals: 12,
                    blocks: 12,
                    slamDunks: 7,
                },
                "Brook Lopez": {
                    number: 11,
                    shoe: 17,
                    points: 17,
                    rebounds: 19,
                    assists: 10,
                    steals: 3,
                    blocks: 1,
                    slamDunks: 15,
                },
                "Mason Plumlee": {
                    number: 1,
                    shoe: 19,
                    points: 26,
                    rebounds: 12,
                    assists: 6,
                    steals: 3,
                    blocks: 8,
                    slamDunks: 5,
                },
                "Jason Terry": {
                    number: 31,
                    shoe: 15,
                    points: 19,
                    rebounds: 2,
                    assists: 2,
                    steals: 4,
                    blocks: 11,
                    slamDunks: 1,
                },
            },
        },
        away: {
            teamName: "Charlotte Hornets",
            colors: ["Turquoise", "Purple"],
            players: {
                "Jeff Adrien": {
                    number: 4,
                    shoe: 18,
                    points: 10,
                    rebounds: 1,
                    assists: 1,
                    steals: 2,
                    blocks: 7,
                    slamDunks: 2,
                },
                "Bismack Biyombo": {
                    number: 0,
                    shoe: 16,
                    points: 12,
                    rebounds: 4,
                    assists: 7,
                    steals: 7,
                    blocks: 15,
                    slamDunks: 10,
                },
                "DeSagna Diop": {
                    number: 2,
                    shoe: 14,
                    points: 24,
                    rebounds: 12,
                    assists: 12,
                    steals: 4,
                    blocks: 5,
                    slamDunks: 5,
                },
                "Ben Gordon": {
                    number: 8,
                    shoe: 15,
                    points: 33,
                    rebounds: 3,
                    assists: 2,
                    steals: 1,
                    blocks: 1,
                    slamDunks: 0,
                },
                "Brendan Hayword": {
                    number: 33,
                    shoe: 15,
                    points: 6,
                    rebounds: 12,
                    assists: 12,
                    steals: 22,
                    blocks: 5,
                    slamDunks: 12,
                },
            },
        },
    };
}
// Helper: return the game data
const gameData = () => gameObject();

// Helper: get all players as [name, stats] from both teams
const allPlayersEntries = () => {
  const data = gameData();
  return [
    ...Object.entries(data.home.players),
    ...Object.entries(data.away.players),
  ];
};

// Helper: find a player entry [name, stats]
const findPlayerEntry = (playerName) =>
  allPlayersEntries().find(([name]) => name === playerName);

// Helper: find a team by teamName
const findTeam = (teamName) => {
  const data = gameData();
  if (data.home.teamName === teamName) return data.home;
  if (data.away.teamName === teamName) return data.away;
  return undefined;
};

function numPointsScored(playerName) {
  const entry = findPlayerEntry(playerName);
  return entry ? entry[1].points : undefined;
}

function shoeSize(playerName) {
  const entry = findPlayerEntry(playerName);
  return entry ? entry[1].shoe : undefined;
}

function teamColors(teamName) {
  const team = findTeam(teamName);
  return team ? team.colors : undefined;
}

function teamNames() {
  const data = gameData();
  return [data.home.teamName, data.away.teamName];
}

function playerNumbers(teamName) {
  const team = findTeam(teamName);
  if (!team) return undefined;
  return Object.values(team.players).map((stats) => stats.number);
}

function playerStats(playerName) {
  const entry = findPlayerEntry(playerName);
  return entry ? entry[1] : undefined;
}

function bigShoeRebounds() {
  const entries = allPlayersEntries();
  let biggest = entries[0]; // [name, stats]

  for (const entry of entries) {
    if (entry[1].shoe > biggest[1].shoe) {
      biggest = entry;
    }
  }
  return biggest[1].rebounds;
}

// Bonus
function mostPointsScored() {
  const entries = allPlayersEntries();
  let top = entries[0];

  for (const entry of entries) {
    if (entry[1].points > top[1].points) top = entry;
  }
  return top[0];
}

function winningTeam() {
  const data = gameData();

  const homePoints = Object.values(data.home.players).reduce(
    (sum, stats) => sum + stats.points,
    0
  );
  const awayPoints = Object.values(data.away.players).reduce(
    (sum, stats) => sum + stats.points,
    0
  );

  return homePoints > awayPoints ? data.home.teamName : data.away.teamName;
}

function playerWithLongestName() {
  const entries = allPlayersEntries();
  let longest = entries[0][0];

  for (const [name] of entries) {
    if (name.length > longest.length) longest = name;
  }
  return longest;
}

function doesLongNameStealATon() {
  const longestName = playerWithLongestName();
  const longestEntry = findPlayerEntry(longestName);
  if (!longestEntry) return false;

  const entries = allPlayersEntries();
  let mostSteals = entries[0][1].steals;

  for (const entry of entries) {
    if (entry[1].steals > mostSteals) mostSteals = entry[1].steals;
  }

  return longestEntry[1].steals === mostSteals;
}

module.exports = {
  gameObject,
  numPointsScored,
  shoeSize,
  teamColors,
  teamNames,
  playerNumbers,
  playerStats,
  bigShoeRebounds,
  mostPointsScored,
  winningTeam,
  playerWithLongestName,
  doesLongNameStealATon,
};
