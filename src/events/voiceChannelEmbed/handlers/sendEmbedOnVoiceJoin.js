const userSchema = require('../../../mongoDB/userSchema');
const guildSettingsSchema = require('../../../mongoDB/guildSettingsSchema');
const { createFields } = require('../modules/customEmbed');
const { deleteEmbed } = require('../modules/deleteEmbed');
const { customEmbed } = require('../modules/customEmbed');


// 채널 입장시 임베드 전송.js // 입장 하면 이전 중복 메시지 삭제, 이후 메시지 전송
async function sendEmbedOnVoiceJoin(newState) {
    try {

        const member = newState.member;
        const channel = newState.channel;
        const guildId = newState.guild.id;

        // 유저 닉네임 조회
        const userData = await userSchema.findOne({ userId: newState.id });
        if (!userData) return;

        // 길드 셋팅 조회
        const guildSettings = await guildSettingsSchema.findOne({ guildId: guildId });
        if (!guildSettings) return;

        // 유저 닉네임 양식에 맞게 가공
        const fields = await createFields(userData, guildSettings);
        if (fields.length <= 0) return;

        // 이 전 임베드 삭제
        await deleteEmbed(newState, member);

        // 임베드 가공
        const embed = customEmbed(member, fields, userData.updatedAt);

        // 임베드 전송
        await channel.send({ embeds: [embed] });

    } catch (error) {
        console.error('sendEmbedOnVoiceJoin 에러 : ' + error);
    }

};

module.exports = { sendEmbedOnVoiceJoin }