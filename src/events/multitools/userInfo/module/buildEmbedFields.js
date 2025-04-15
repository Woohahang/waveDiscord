const platforms = require('../../../../constants/platforms');
const platformNames = require('../../../../constants/platformNames');
const getGamesLink = require('../../../voiceChannelEmbed/module/getGamesLink')
const emojiId = require('../../../voiceChannelEmbed/module/emojiId');

/**
 * 유저 데이터를 기반으로 게임별 닉네임 정보를 정리하여 
 * 디스코드 임베드에 들어갈 필드를 생성합니다.
 *
 * @param {Object} userData - 유저의 게임 닉네임 정보가 포함된 객체
 * @returns {Array|null} 디스코드 임베드 필드 배열 또는 null (데이터 없음)
 */
function buildEmbedFields(userData) {
    try {
        const fields = [];

        // 등록된 모든 게임 키를 추출합니다 (2차원 배열 → 1차원으로 평탄화)
        const allGameKeys = Object.values(platforms).flat();

        // 닉네임이 존재하는 게임들만 필터링합니다
        const gamesWithData = allGameKeys.filter(key => userData[key].length > 0);

        // 플랫폼 별로 임베드 필드를 생성합니다
        Object.keys(platforms).forEach(platform => {
            let value = '';

            // 해당 플랫폼에 포함된 게임들 중 유저가 닉네임을 등록한 게임만 필터링합니다
            gamesWithData
                .filter(game => platforms[platform].includes(game))
                .forEach(game => {
                    const nicknames = userData[game];

                    nicknames.forEach(nickname => {
                        const emoji = `<:wave_${game}:${emojiId(game)}>`;

                        // Steam은 playerName과 프로필 링크를 사용합니다
                        if (game === 'steam')
                            value += `${emoji} [${nickname.playerName}](${nickname.profileLink})\n`;

                        // 오버워치 및 블리자드는 링크 없이 그대로 사용합니다
                        else if (game === 'overWatchTwo' || game === 'blizzard')
                            value += `${emoji} ${nickname}\n`;

                        // 그 외 게임은 닉네임과 전적 검색 사이트 링크가 함께 표시됩니다
                        else
                            value += `${emoji} [${nickname}](${getGamesLink(game, nickname)})\n`;

                    });
                });

            // 하나라도 값이 있으면 임베드 필드로 추가합니다
            if (value) {
                fields.push({ name: `** ${platformNames[platform]} ** `, value });
            }
        });

        return fields.length > 0 ? fields : null;

    } catch (error) {
        console.error('buildEmbedFields 예외 발생', error);
    }
};

module.exports = buildEmbedFields;