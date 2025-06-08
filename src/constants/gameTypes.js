/**
 * @file 게임 타입 상수 정의 파일
 * 
 * @description 봇 전반에서 사용하는 게임 키워드를 중앙에서 관리합니다.
 */
const GAME_TYPES = {
    // Steam
    STEAM: 'steam',
    RAINBOW_SIX: 'rainbowSix',

    // Riot
    LEAGUE_OF_LEGENDS: 'leagueOfLegends',
    TEAMFIGHT_TACTICS: 'teamfightTactics',
    VALORANT: 'valorant',

    // BattleGround
    STEAM_BATTLEGROUNDS: 'steamBattleGround',
    KAKAO_BATTLEGROUNDS: 'kakaoBattleGround',

    // Blizzard
    BLIZZARD: 'blizzard',
    OVERWATCH_2: 'overWatchTwo',

    // 기타
    LOST_ARK: 'lostArk',
};

const VALID_GAME_KEYS = Object.values(GAME_TYPES);

module.exports = { GAME_TYPES, VALID_GAME_KEYS };