const GAME_TYPES = require("./gameTypes");

const GAME_DISPLAY_LABELS = {
    [GAME_TYPES.STEAM]: 'Steam',
    [GAME_TYPES.RAINBOW_SIX]: 'Rainbow Six',
    [GAME_TYPES.LEAGUE_OF_LEGENDS]: 'League of Legends',
    [GAME_TYPES.TEAMFIGHT_TACTICS]: 'Teamfight Tactics',
    [GAME_TYPES.VALORANT]: 'Valorant',
    [GAME_TYPES.STEAM_BATTLEGROUNDS]: 'Steam Battle Grounds',
    [GAME_TYPES.KAKAO_BATTLEGROUNDS]: 'Kakao Battle Grounds',
    [GAME_TYPES.BLIZZARD]: 'Blizzard',
    [GAME_TYPES.OVERWATCH_2]: 'Overwatch 2',
    [GAME_TYPES.LOST_ARK]: 'Lost Ark',
};

module.exports = GAME_DISPLAY_LABELS;