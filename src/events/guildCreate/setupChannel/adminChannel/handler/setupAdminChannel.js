const GuildSettings = require('../../../../../services/GuildSettings');
const createAdminChannel = require('../modules/createAdminChannel');
const sendAdminMessage = require('../modules/sendAdminMessage');
const deleteOldMessages = require('../../../update/updateModule/deleteOldMessages');

/**
 * 길드 설정을 로드하거나 생성하고, 관리자 채널을 설정합니다.
 * 관리자 채널이 존재하지 않으면 새로 생성하고, 관리자 메시지를 전송합니다.
 * 
 * @param {Guild} guild - 설정을 적용할 Discord 길드 객체
 */
module.exports = async (guild) => {
    try {
        let channel = null;

        // 길드 인스턴스 생성 및 길드 데이터를 불러옵니다.
        const guildSettings = new GuildSettings(guild.id);
        const guildData = await guildSettings.loadOrCreate();

        // 길드 데이터에서 관리자 채널 ID가 있다면 해당 채널을 가져오려고 시도합니다.
        if (guildData.adminChannelId) {
            channel = await guild.channels.fetch(guildData.adminChannelId);
        };

        // 채널이 존재하지 않으면 새로 생성합니다.
        if (!channel) {
            channel = await createAdminChannel(guild);
        };

        // 새 채널 ID를 길드 설정에 저장합니다.
        await guildSettings.saveChannelId('adminChannel', channel.id);

        // 관리자 메시지를 새 채널에 전송합니다.
        await sendAdminMessage(channel, guildData);

        // 최근 메세지 두개를 제외한 나머지 메세지를 삭제합니다.
        await deleteOldMessages(channel);

    } catch (error) {
        console.error('setupAdminChannel.js 예외 : ', error);
    };
};