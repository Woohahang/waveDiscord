const platforms = require('../../../../constants/platforms');
const platformNames = require('../../../../constants/platformNames');
const emojiId = require('../../../voiceChannelEmbed/module/emojiId');
const getGamesLink = require('../../../voiceChannelEmbed/module/getGamesLink');

/**
 * 유저의 게임 닉네임 정보를 바탕으로 플랫폼별 디스코드 임베드 필드를 생성합니다.
 *
 * @param {Object} userData - 유저가 등록한 게임별 닉네임 정보
 * @param {Array<string>} gamesWithData - 유저가 등록한 닉네임의 게임들
 * @returns {Array<Object>} - 디스코드 임베드 필드 배열
 */
function buildFieldsByPlatform(userData, gamesWithData) {
    const fields = [];

    // 플랫폼 목록을 순회하면서 각 플랫폼별 필드를 구성합니다
    Object.keys(platforms).forEach(platform => {
        let value = '';

        // 해당 플랫폼에 속한 게임 중 닉네임이 등록된 게임만 필터링합니다
        gamesWithData.filter(game => platforms[platform].includes(game)).forEach(game => {
            const nicknames = userData[game];

            // 각 게임에 등록된 닉네임을 순회하면서 필드 내용을 만듭니다
            nicknames.forEach(nickname => {
                const emoji = `<:wave_${game}:${emojiId(game)}>`; // 이모지 구성

                // Steam은 객체 형태로 닉네임과 프로필 링크를 포함합니다
                if (game === 'steam')
                    value += `${emoji} [${nickname.playerName}](${nickname.profileLink})\n`;

                // 오버워치2, 블리자드는 링크 없이 닉네임만 표시합니다
                else if (game === 'overWatchTwo' || game === 'blizzard')
                    value += `${emoji} ${nickname}\n`;

                // 기타 게임은 닉네임과 검색 링크를 함께 표시합니다
                else
                    value += `${emoji} [${nickname}](${getGamesLink(game, nickname)})\n`;
            });
        });

        // 해당 플랫폼에 표시할 값이 존재하면 필드에 추가합니다
        if (value) {
            fields.push({ name: `** ${platformNames[platform]} ** `, value });
        }
    });

    return fields;
}

module.exports = buildFieldsByPlatform;