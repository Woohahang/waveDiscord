// sendEmbedOnVoiceJoin.js

const { createFields } = require('../modules/customEmbed');
const { deleteEmbed } = require('../modules/deleteEmbed');
const { customEmbed } = require('../modules/customEmbed');

const GuildSettings = require('../../../services/GuildSettings');
const UserSettings = require('../../../services/UserSettings');

/* 채널 입장 임베드 전송, 이전 중복 메시지 삭제 */
module.exports = async (newState) => {
    try {
        const member = newState.member;
        const channel = newState.channel;
        const guildId = newState.guild.id;

        // 유저 정보 조회
        const userNicknames = await UserSettings.load(member.id);
        if (!userNicknames) return;

        // 이건 인스턴스로 제대로 팍 쓰는게 좋을듯?
        // 길드 셋팅 조회
        const guildSettingsInstance = new GuildSettings(guildId);
        const guildSettings = await guildSettingsInstance.loadOrCreate();

        // 유저 닉네임 양식에 맞게 가공
        const fields = await createFields(userNicknames, guildSettings);
        if (fields.length <= 0) return;

        // 이 전 임베드 삭제
        await deleteEmbed(newState, member);

        // 임베드 가공
        const embed = customEmbed(member, fields, userNicknames.updatedAt);

        // 임베드 전송
        await channel.send({ embeds: [embed] });

    } catch (error) {
        console.error('sendEmbedOnVoiceJoin 에러 : ', error);
    };
};