const GAME_TYPES = require('@constants/gameTypes');
const isRiotGame = require('@domain/game/isRiotGame');
const USER_RESULT_CODES = require('@domain/user/constants/userResultCodes');

function formatRiotNickname(userInput) {
    const parts = userInput.split('#');

    // Roit 형식 확인: "#" - 0개 또는 2개 이상 방지
    if (parts.length !== 2) {
        return {
            ok: false,
            code: USER_RESULT_CODES.INVALID_RIOT_TAG_FORMAT,
        };
    }

    // 닉네임과 태그 좌우 공백 제거
    let [nickname, tag] = userInput.split('#');
    nickname = nickname.trim();
    tag = tag.trim();

    if (!nickname || !tag) {
        return {
            ok: false,
            code: USER_RESULT_CODES.INVALID_RIOT_TAG_FORMAT,
        };
    }

    // 닉네임이 두 글자일 경우 중간에 공백 삽입
    if (nickname.length === 2)
        nickname = `${nickname[0]} ${nickname[1]}`;

    return {
        ok: true,
        value: `${nickname}#${tag}`
    };
}

function formatSteamProfileLink(userInput) {
    const trimmed = userInput.trim();

    // 스팀 프로필 링크 체크
    const isValid =
        trimmed.includes('steamcommunity.com/profiles/') ||
        trimmed.includes('steamcommunity.com/id/');

    if (!isValid) {
        return {
            ok: false,
            code: USER_RESULT_CODES.INVALID_STEAM_PROFILE_LINK,
        };
    }

    return {
        ok: true,
        value: trimmed,
    };
}

module.exports = function formatNicknameByGame(gameType, userInput) {
    if (isRiotGame(gameType))
        return formatRiotNickname(userInput);

    if (gameType === GAME_TYPES.STEAM)
        return formatSteamProfileLink(userInput);

    return {
        ok: true,
        value: userInput.trim()
    };
};