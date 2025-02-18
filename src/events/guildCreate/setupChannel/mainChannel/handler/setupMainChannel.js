const GuildSettings = require('../../../../../services/GuildSettings');
const createMainChannel = require('../modules/createMainChannel');
const sendMainMessage = require('../modules/sendMainMessage');
const deleteOldMessages = require('../../../update/updateModule/deleteOldMessages');
const getChannel = require('../../../../../module/common/getChannel');

/**
 * 길드 설정을 로드하거나 생성하고, 메인 채널을 설정합니다.
 * 메인 채널이 존재하지 않으면 새로 생성하고, 메시지를 전송합니다.
 * 
 * @param {Guild} guild - 설정을 적용할 Discord 길드 객체
 */
module.exports = async (guild) => {
    try {
        // 길드 인스턴스 생성 및 길드 데이터를 불러옵니다.
        const guildSettings = new GuildSettings(guild.id);
        const guildData = await guildSettings.loadOrCreate();

        // Wave 메인 채널을 불러옵니다.
        let channel = await getChannel(guild, guildData.mainChannelId);

        // 채널이 존재하지 않으면 새로 생성합니다.
        if (!channel) {
            channel = await createMainChannel(guild);
        };

        // 새 채널 ID를 길드 설정에 저장합니다.
        await guildSettings.saveChannelId('mainChannel', channel.id);

        // Wave 메인 채널에 메세지를 보냅니다.
        await sendMainMessage(channel, guildData);

        // 최근 메세지 두개를 제외한 나머지 메세지를 삭제합니다.
        await deleteOldMessages(channel);

    } catch (error) {
        console.error('Wave 메인 채널 생성 또는 불러오기 도중 오류 발생가 발생했습니다.');
        throw error;
    };
};