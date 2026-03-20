const GAME_TYPES = require('@constants/gameTypes');

const GAME_DISPLAY_NAMES = {
    ko: {
        [GAME_TYPES.STEAM]: '스팀',
        [GAME_TYPES.RAINBOW_SIX]: '레인보우 식스',
        [GAME_TYPES.LEAGUE_OF_LEGENDS]: '리그 오브 레전드',
        [GAME_TYPES.TEAMFIGHT_TACTICS]: '롤토체스',
        [GAME_TYPES.VALORANT]: '발로란트',
        [GAME_TYPES.STEAM_BATTLEGROUNDS]: '스팀 배틀그라운드',
        [GAME_TYPES.KAKAO_BATTLEGROUNDS]: '카카오 배틀그라운드',
        [GAME_TYPES.BLIZZARD]: '블리자드',
        [GAME_TYPES.OVERWATCH_2]: '오버워치 2',
        [GAME_TYPES.LOST_ARK]: '로스트아크',
    },
    en: {
        [GAME_TYPES.STEAM]: 'Steam',
        [GAME_TYPES.RAINBOW_SIX]: 'Rainbow Six',
        [GAME_TYPES.LEAGUE_OF_LEGENDS]: 'League of Legends',
        [GAME_TYPES.TEAMFIGHT_TACTICS]: 'Teamfight Tactics',
        [GAME_TYPES.VALORANT]: 'Valorant',
        [GAME_TYPES.STEAM_BATTLEGROUNDS]: 'Steam Battlegrounds',
        [GAME_TYPES.KAKAO_BATTLEGROUNDS]: 'Kakao Battlegrounds',
        [GAME_TYPES.BLIZZARD]: 'Blizzard',
        [GAME_TYPES.OVERWATCH_2]: 'Overwatch 2',
        [GAME_TYPES.LOST_ARK]: 'Lost Ark',
    }
};

module.exports = GAME_DISPLAY_NAMES;