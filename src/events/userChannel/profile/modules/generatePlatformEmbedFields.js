const platformNames = require('../../../../constants/platformNames');
const platforms = require('../../../../constants/platforms');
const getGamesLink = require('../../../voiceChannelEmbed/module/getGamesLink');
const { games } = require('../../../../module/games/gameData');

function generatePlatformEmbedFields(userData) {
    const fields = [];

    // platforms 객체의 키를 순회하기 위해 Object.keys()를 사용해 배열로 변환합니다.
    Object.keys(platforms).forEach(platform => {
        let value = '';

        // 각 플랫폼에 해당하는 게임들을 필터링합니다.
        games
            .filter(game => platforms[platform].includes(game))
            .forEach(game => {
                const nicknames = userData[game];

                nicknames.forEach(nickname => {

                    if (game === 'steam')
                        value += `[${nickname.playerName}](${nickname.profileLink})\n`;

                    else if (game === 'overWatchTwo' || game === 'blizzard')
                        value += `${nickname}\n`;

                    else
                        value += `[${nickname}](${getGamesLink(game, nickname)})\n`;

                });
            });

        // value가 비어있지 않으면 fields 배열에 추가합니다.
        if (value) {
            fields.push({ name: `** ${platformNames[platform]} ** `, value });
        }
    });

    return fields.length > 0 ? fields : null;
};

module.exports = generatePlatformEmbedFields;