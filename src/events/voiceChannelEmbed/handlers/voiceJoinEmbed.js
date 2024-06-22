const { EmbedBuilder } = require('discord.js');
const GuildSettings = require('../../../services/GuildSettings');
const UserSettings = require('../../../services/UserSettings');
const EmojiSettings = require('../../../services/EmojiSettings');
const createEmbedFields = require('../module/createEmbedFields');
const checkMissingEmojis = require('../module/checkMissingEmojis');
const requiresUpdateField = require('../module/requiresUpdateField');

function createEmbed(member, fields, { updatedAt }) {
    const displayName = member.nickname ? member.nickname : member.user.globalName;

    return embed = new EmbedBuilder()
        .setColor('#0099ff')
        .setColor(0x0099FF)
        .setAuthor({ name: displayName, iconURL: member.user.displayAvatarURL(), url: member.user.avatarURL() })
        .addFields(fields)
        .setTimestamp(new Date(updatedAt))
        .setFooter({ text: '―――――― update', iconURL: 'https://drive.google.com/uc?export=view&id=19W-rsIvrkFJSJcZ7-PHXOfZcPRO1HYTi' });
};

/* 채널 입장 임베드 전송, 이전 중복 메시지 삭제 */
module.exports = async (newState) => {
    try {
        const member = newState.member;
        const guild = newState.guild;
        const channel = newState.channel;

        // 유저 인스턴스 생성 및 유저 데이터를 불러옵니다.
        const userStettings = new UserSettings(member.id);
        const userData = await userStettings.loadUserData();
        if (!userData) return;

        // 길드 인스턴스 생성 및 길드 데이터를 불러옵니다.
        const guildSettings = new GuildSettings(guild.id);
        const guildData = await guildSettings.loadOrCreate();

        // 이모지 인스턴스 생성 및 이모지 데이터를 불러옵니다.
        const emojiSettings = new EmojiSettings(guild.id);
        const emojiData = await emojiSettings.loadOrCreate(guild);

        // 임베드 필드 생성를 만듭니다.
        let fields = createEmbedFields(userData, guildData, emojiData);
        if (!fields) return;

        // 이모지 누락을 확인합니다.
        const missingEmojis = checkMissingEmojis(guildData, emojiData);
        if (missingEmojis.length > 0) {
            fields = requiresUpdateField();
        };

        // 임베드를 생성합니다.
        const embed = createEmbed(member, fields, userData);

        // 임베드를 전송합니다.
        await channel.send({ embeds: [embed] });

    } catch (error) {
        // 10008 : Unknown Message,  10003 : Unknown Channel
        if (error.code === 10008 || error.code === 10003) return;
        console.error('voiceJoinEmbed.js 에러 : ', error);
    };
};