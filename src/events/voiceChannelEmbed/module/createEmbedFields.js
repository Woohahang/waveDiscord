const platformNames = require('../../../constants/platformNames');
const platforms = require('../../../constants/platforms');
const filterKeysByValue = require('../../../shared/utils/filterKeysByValue');
const getGamesLink = require('../../../shared/game/getGamesLink');
const emojiId = require('../../../shared/discord/emojiId');

// 유저 데이터와 길드 데이터를 바탕으로 임베드 필드를 생성합니다.
function createEmbedFields(userData, guildData) {

    const fields = [];

    // 길드에 보이도록 설정된 게임들을 필터링합니다.
    const displayedGames = filterKeysByValue(guildData, true);

    // 유저 데이터에 닉네임이 있는 게임들만 필터링합니다.
    const gamesWithData = displayedGames.filter(game => userData[game].length > 0);

    // platforms 객체의 키를 순회하기 위해 Object.keys()를 사용해 배열로 변환합니다.
    Object.keys(platforms).forEach(platform => {
        let value = '';

        // 각 플랫폼에 해당하는 게임들을 필터링합니다.
        gamesWithData
            .filter(game => platforms[platform].includes(game))
            .forEach(game => {
                const nicknames = userData[game];

                nicknames.forEach(nickname => {
                    const emoji = `<:wave_${game}:${emojiId(game)}>`;

                    if (game === 'steam')
                        value += `${emoji} [${nickname.playerName}](${nickname.profileLink})\n`;

                    else if (game === 'overWatchTwo' || game === 'blizzard')
                        value += `${emoji} ${nickname}\n`;

                    else
                        value += `${emoji} [${nickname}](${getGamesLink(game, nickname)})\n`;

                });
            });

        // value가 비어있지 않으면 fields 배열에 추가합니다.
        if (value) {
            fields.push({ name: `** ${platformNames[platform]} ** `, value });
        }
    });

    return fields.length > 0 ? fields : null;
};

module.exports = createEmbedFields;