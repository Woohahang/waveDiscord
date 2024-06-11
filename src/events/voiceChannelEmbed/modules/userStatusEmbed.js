// userStatusEmbed.js

const { EmbedBuilder } = require('discord.js');
const createFields = require('./embedModules/createFields');
const emojiLoad = require('./embedModules/emojiLoad');
const isValidEmojis = require('./embedModules/isValidEmojis');
const requiresUpdateField = require('./embedModules/requiresUpdateField');

let emojiMaps = {};

module.exports = async (newState, userData, guildData) => {
    try {
        const member = newState.member;
        const guildId = newState.guild.id;
        const displayName = member.nickname ? member.nickname : member.user.globalName;
        const waveEmojis = emojiMaps[guildId] || await emojiLoad(newState, emojiMaps);

        // 기본 필드를 requiresUpdateField로 설정
        let fields = requiresUpdateField();

        // 이모지가 유효하면 유저 정보 생성
        if (isValidEmojis(guildData, newState.guild)) {
            fields = createFields(userData, guildData, waveEmojis);
        };

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
        console.error('userStatusEmbed.js 예외 : ', error);
    };
};