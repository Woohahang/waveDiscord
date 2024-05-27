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

        // 유저 인스턴스 생성
        const userSettings = new UserSettings(member.id);

        // 유저 데이터 불러오기
        const userData = await userSettings.load();
        if (!userData) return;

        // 길드 인스턴스 생성
        const guildSettings = new GuildSettings(guildId);

        // 길드 데이터 불러오기
        const guildData = await guildSettings.loadOrCreate();
        if (!guildData) { return console.log('길드 데이터를 찾을 수 없을 때 나오는 콘솔인데 나올리가 없겠지?') };

        // 유저 닉네임 가공
        const fields = await createFields(userData, guildData);
        if (fields.length <= 0) return;

        // 임베드 가공
        const embed = customEmbed(member, fields, userData.updatedAt);

        await newState.channel.send({ embeds: [embed] });

    } catch (error) {
        console.error('moveEmbedOnVoiceChannelChange.js 에러 : ', error);
    };
};