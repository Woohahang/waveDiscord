const platformNames = require('../../../../constants/platformNames');
const platforms = require('../../../../constants/platforms');
const getGamesLink = require('../../../voiceChannelEmbed/modules/embedModules/getGamesLink');


function generateGameFields(userData) {
    const fields = [];

    // games 객체의 각 플랫폼(예: steam, riotGames 등)에 대해 반복
    Object.keys(platforms).forEach(platform => {
        // 플랫폼에 속한 게임 목록을 가져옴 (배열 형태로 변환)
        const gamesInPlatform = Array.isArray(platforms[platform]) ? platforms[platform] : [platforms[platform]];

        // 닉네임이 있는 게임 목록만 필터링
        const filteredGames = gamesInPlatform.filter(game => userData[game] && userData[game].length > 0);

        if (filteredGames.length > 0) {
            // 각 게임에 대해 닉네임을 문자열로 변환하여 결합
            const value = filteredGames.map(game => {
                if (game === 'steam') {
                    return userData[game].map(entry => `[${entry.playerName}](${entry.profileLink})`);
                } else {
                    return userData[game].map(nickname => `[${nickname}](${getGamesLink(game, nickname)})`);
                };
            }).join('\n');

            fields.push({ name: `**${platformNames[platform]}**`, value });
        };
    });

    return fields;
};

module.exports = generateGameFields;