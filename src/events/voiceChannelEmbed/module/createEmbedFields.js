const platformNames = require('../../../constants/platformNames');
const platforms = require('../../../constants/platforms');
const filterOptions = require('../../../module/data/filterOptions');
const getGamesLink = require('../../voiceChannelEmbed/module/getGamesLink');


// 유저 데이터와 길드 데이터를 바탕으로 임베드 필드를 생성합니다.
function createEmbedFields(userData, guildData, waveEmojiArray) {

    const fields = [];

    // 길드에 보이도록 설정된 게임들을 필터링합니다.
    const displayedGames = filterOptions(guildData, true);

    // 유저 데이터에 닉네임이 있는 게임들만 필터링합니다.
    const gamesWithData = displayedGames.filter(game => userData[game].length > 0);

    // waveEmoji 배열을 객체로 변환합니다.
    const waveEmoji = waveEmojiArray.reduce((acc, emoji) => {
        acc[emoji.name] = emoji.id;
        return acc;
    }, {});

    // platforms 객체의 키를 순회하기 위해 Object.keys()를 사용해 배열로 변환합니다.
    Object.keys(platforms).forEach(platform => {
        let value = '';

        // 각 플랫폼에 해당하는 게임들을 필터링합니다.
        gamesWithData
            .filter(game => platforms[platform].includes(game))
            .forEach(game => {
                const nicknames = userData[game];

                nicknames.forEach(nickname => {
                    const emojiId = waveEmoji[`wave_${game}`];

                    if (game === 'steam')
                        value += `<:wave_${game}:${emojiId}> [${nickname.playerName}](${nickname.profileLink}) \n`;

                    if (game !== 'steam')
                        value += `<:wave_${game}:${emojiId}> [${nickname}](${getGamesLink(game, nickname)}) \n`;
                });
            });

        // value가 비어있지 않으면 fields 배열에 추가합니다.
        if (value) {
            fields.push({ name: `** ${platformNames[platform]} ** `, value: value.trim() });
        }
    });

    return fields.length > 0 ? fields : null;
};

module.exports = createEmbedFields;