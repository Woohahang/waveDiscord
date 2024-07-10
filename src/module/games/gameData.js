// gameData.js

const games = [
    'steam',
    'leagueOfLegends',
    'teamfightTactics',
    'valorant',
    'steamBattleGround',
    'kakaoBattleGround',
    'blizzard',
    'overWatchTwo',
    'lostArk',
];

const gameLabels = {
    steam: 'Steam',
    leagueOfLegends: 'League of Legends',
    teamfightTactics: 'Teamfight Tactics',
    valorant: 'Valorant',
    steamBattleGround: 'Steam Battle Grounds',
    kakaoBattleGround: 'KaKao Battle Grounds',
    blizzard: 'Blizzard',
    overWatchTwo: 'OVERWATCH 2',
    lostArk: 'Lost Ark',
};

const description = {
    steam: '스팀',
    leagueOfLegends: '리그 오브 레전드',
    teamfightTactics: '롤토체스',
    valorant: '발로란트',
    steamBattleGround: '스팀 배틀 그라운드',
    kakaoBattleGround: '카카오 배틀 그라운드',
    blizzard: '블리자드',
    overWatchTwo: '오버워치 2',
    lostArk: '로스트아크',
};


module.exports = { games, gameLabels, description };