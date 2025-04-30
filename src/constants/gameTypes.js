/**
 * @file 게임 타입 상수 정의 파일
 * 
 * @description 봇 전반에서 사용하는 게임 키워드를 중앙에서 관리합니다.
 */
const GAME_TYPES = {
    // Steam 관련
    STEAM: 'steam',
    RAINBOW_SIX: 'rainbowSix',
    STEAM_BATTLEGROUNDS: 'steamBattleGround',

    // Kakao 관련
    KAKAO_BATTLEGROUNDS: 'kakaoBattleGround',

    // Riot 관련
    LEAGUE_OF_LEGENDS: 'leagueOfLegends',
    TEAMFIGHT_TACTICS: 'teamfightTactics',
    VALORANT: 'valorant',

    // Blizzard 관련
    BLIZZARD: 'blizzard',
    OVERWATCH_2: 'overWatchTwo',

    // 기타
    LOST_ARK: 'lostArk',
};

module.exports = GAME_TYPES;