// moveEmbedOnVoiceChannelChange.js

const UserSettings = require('../../../services/UserSettings');
const GuildSettings = require('../../../services/GuildSettings');

const { deleteEmbed } = require('../../voiceChannelEmbed/modules/deleteEmbed');
const { createFields } = require('../modules/customEmbed');
const { customEmbed } = require('../modules/customEmbed');

module.exports = async (oldState, newState) => {
    try {
        const member = newState.member;
        const guildId = newState.guild.id;

        await deleteEmbed(oldState, oldState.member);

        // 유저 정보 조회
        const userData = await UserSettings.load(member.id);
        if (!userData) return;

        // 길드 셋팅
        const guildData = new GuildSettings(guildId);
        const guildSettings = await guildData.loadOrCreate();
        if (!guildSettings) return;

        // 유저 닉네임 가공
        const fields = await createFields(userData, guildSettings);
        if (fields.length <= 0) return;

        // 임베드 가공
        const embed = customEmbed(member, fields, userData.updatedAt);

        await newState.channel.send({ embeds: [embed] });

    } catch (error) {
        console.error('moveEmbedOnVoiceChannelChange.js 에러 : ' + error);
    };
};