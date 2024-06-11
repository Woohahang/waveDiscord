// test.js

const { EmbedBuilder } = require('discord.js');

const filterOptions = require('../../../module/data/filterOptions');
const getGamesLink = require('../modules/getGamesLink');

let emojiMaps = {};

// 라이엇 주소 : 띄어쓰기 -> %20 변경, # -> - 변경
function loLCustom(nickname) {
    nickname = nickname.replace(/ /g, '%20');
    nickname = nickname.replace(/#/g, '-');

    return nickname;
};

async function emojiLoad(newState) {
    try {
        const guild = newState.guild;
        const serverEmojis = await guild.emojis.fetch();

        const waveEmojis = serverEmojis
            .filter(emoji => emoji.name.split('_')[0] === 'wave');


        emojiMaps[guild.id] = new Map();

        waveEmojis.forEach(emoji => {
            emojiMaps[guild.id].set(emoji.name, emoji.id);
        });

        return emojiMaps[guild.id];

    } catch (error) {
        throw error;
    };
};

function createFields(userData, guildData, waveEmojis) {
    try {
        let fields = [];

        const trueValueGames = filterOptions(guildData, true);
        trueValueGames.forEach(gameType => {

            switch (gameType) {
                case 'steam':
                    const { playerName, profileLink } = userData[gameType][0];
                    const gameTypeEmoji = waveEmojis.get('wave_' + gameType);

                    fields.push({ name: 'Steam', value: `<:wave_${gameType}:${gameTypeEmoji}> [${playerName}](${profileLink})` });
                    break;

                case 'leagueOfLegends':
                case 'teamfightTactics':
                case 'valorant':
                    if (userData[gameType].length > 0) {
                        let riotGames = '';

                        userData[gameType].forEach(nickName => {
                            const gameTypeEmoji = waveEmojis.get('wave_' + gameType);
                            riotGames += `[<:wave_${gameType}:${gameTypeEmoji}> ${nickName}](${getGamesLink(gameType, nickName)})\n`;
                        });

                        fields.push({ name: 'Riot Games', value: riotGames });
                    };
                    break;

                case 'steamBattleGround':
                case 'kakaoBattleGround':
                    if (userData[gameType].length > 0) {
                        let BattleGroundGames = '';

                        userData[gameType].forEach(nickName => {
                            const gameTypeEmoji = waveEmojis.get('wave_' + gameType);
                            BattleGroundGames += `[<:wave_${gameType}:${gameTypeEmoji}> ${nickName}](${getGamesLink(gameType, nickName)})\n`;
                        });

                        fields.push({ name: 'Battle Ground', value: BattleGroundGames });
                    };
                    break;

            };
        });

        return fields;

    } catch (error) {
        throw error;
    };
};

module.exports = async (newState, userData, guildData) => {
    try {
        const member = newState.member;
        const guildId = newState.guild.id;
        const displayName = member.nickname ? member.nickname : member.user.globalName;
        const waveEmojis = emojiMaps[guildId] || await emojiLoad(newState);

        let fields = createFields(userData, guildData, waveEmojis);

        // console.log(fields);

        // 임베드 정의
        const embed = new EmbedBuilder()
            .setColor('#0099ff')
            .setColor(0x0099FF)
            .setAuthor({ name: displayName, iconURL: member.user.displayAvatarURL(), url: member.user.avatarURL() })
            .addFields(fields)
            .setTimestamp(new Date(userData.updatedAt))
            .setFooter({ text: '―――――――― update', iconURL: 'https://drive.google.com/uc?export=view&id=19W-rsIvrkFJSJcZ7-PHXOfZcPRO1HYTi' });

        return embed;

    } catch (error) {
        console.error('test.js 예외 : ', error);
    };
};