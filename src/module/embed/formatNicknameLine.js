const emojiId = require('../../shared/discord/emojiId');
const getGamesLink = require('../../shared/game/getGamesLink');

/**
 * 게임 종류에 따라 닉네임을 이모지와 함께 포맷팅합니다.
 * - Steam: 닉네임과 함께 프로필 링크 포함
 * - Overwatch2, Blizzard: 닉네임만 표시
 * - 그 외: 닉네임과 검색 링크 포함
 *
 * @param {string} game - 게임 키 (예: 'steam', 'blizzard')
 * @param {Object|string} nickname - 닉네임 정보 (Steam은 객체, 그 외는 문자열)
 * @returns {string} - 포맷팅된 닉네임 문자열
 */
function formatNicknameLine(game, nickname) {
    const emoji = `<:wave_${game}:${emojiId(game)}>`; // 해당 게임 이모지 구성

    if (game === 'steam')
        return `${emoji} [${nickname.playerName}](${nickname.profileLink})`;
    else if (['overWatchTwo', 'blizzard'].includes(game))
        return `${emoji} ${nickname}`;
    else
        return `${emoji} [${nickname}](${getGamesLink(game, nickname)})`;
}

module.exports = formatNicknameLine;