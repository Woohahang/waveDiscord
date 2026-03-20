const GAME_TYPES = require('@constants/gameTypes');

const RIOT_GAMES = new Set([
    GAME_TYPES.LEAGUE_OF_LEGENDS,
    GAME_TYPES.TEAMFIGHT_TACTICS,
    GAME_TYPES.VALORANT
]);

function isRiotGame(gameType) {
    return RIOT_GAMES.has(gameType);
}

module.exports = isRiotGame;