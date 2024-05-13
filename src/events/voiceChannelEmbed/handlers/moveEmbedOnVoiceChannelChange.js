// moveEmbedOnVoiceChannelChange.js

const { deleteEmbed } = require('../../voiceChannelEmbed/modules/deleteEmbed');

const userSchema = require('../../../mongoDB/userSchema');
const guildSettingsSchema = require('../../../mongoDB/guildSettingsSchema');

const { createFields } = require('../modules/customEmbed');
const { customEmbed } = require('../modules/customEmbed');

async function moveEmbedOnVoiceChannelChange(oldState, newState) {

    const member = newState.member;
    const guildId = newState.guild.id;

    await deleteEmbed(oldState, oldState.member);

    // 유저 닉네임 조회
    const userData = await userSchema.findOne({ userId: newState.id });
    if (!userData) return;

    // 길드 셋팅 조회
    const guildSettings = await guildSettingsSchema.findOne({ guildId: guildId });
    if (!guildSettings) return;

    // 유저 닉네임 양식에 맞게 가공
    const fields = await createFields(userData, guildSettings);
    if (fields.length <= 0) return;

    // 임베드 가공
    const embed = customEmbed(member, fields, userData.updatedAt);

    await newState.channel.send({ embeds: [embed] });
};

module.exports = { moveEmbedOnVoiceChannelChange };