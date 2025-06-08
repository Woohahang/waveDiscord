const ERROR_KEY = require("@constants/errorKeys");
const { GAME_TYPES } = require("@constants/gameTypes");
const RIOT_GAMES = require("@constants/riotGames");

/**
 * 라이엇 태그 포맷 검사 정규식
 * - 닉네임: 1~16자, 태그: 1~5자
 * - 허용 문자: 유니코드 문자, 숫자, 공백
 * - 형식 예: "Hide on bush#KR1"
 */
const RIOT_TAG_REGEX = /^[\p{L}0-9 ]{1,16}#[\p{L}0-9 ]{1,5}$/u;

/**
 * 스팀 프로필 링크 유효성 검사
 * - 허용 형식: https://steamcommunity.com/id/xxx 또는 /profiles/xxx
 */
function isValidSteamLink(link) {
    return /\/(id|profiles)\/[^\/]+/.test(link);
}

/**
 * 닉네임 유효성 검사
 * - 게임 종류에 따라 입력값의 형식이 맞는지 확인
 * - 오류가 있을 경우 ERROR_KEY 반환, 없으면 null 반환
 */
function getNicknameValidationError(gameType, rawNickname) {
    if (RIOT_GAMES.includes(gameType)) {

        if (!RIOT_TAG_REGEX.test(rawNickname))
            return ERROR_KEY.INVALID_RIOT_TAG_FORMAT;
    }

    if (GAME_TYPES.STEAM === gameType) {
        if (!isValidSteamLink(rawNickname))
            return ERROR_KEY.INVALID_STEAM_PROFILE_LINK;
    }

    return null;
}

module.exports = getNicknameValidationError;