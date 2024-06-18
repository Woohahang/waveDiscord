const mainChannelCreate = require('../mainChannel/mainChannelCreate');
const deleteMessagesExcept = require('../../../module/common/deleteMessagesExcept');
const mainMessage = require('./mainMessage');


// 메인 채널 업데이트
async function mainChannelUpdate(guild, guildData) {
    try {
        // 메인 채널 객체 얻기
        const mainChannel = await guild.channels.fetch(guildData.mainChannelId);

        if (mainChannel) {
            // 메세지 전송
            const messageIds = await mainMessage(mainChannel, guildData);

            // 메세지 두개를 잘 전송 했다면, 나머지 메세지를 삭제해라.
            await deleteMessagesExcept(mainChannel, messageIds);

        } else {
            // 메인 채널 생성
            await mainChannelCreate(guild);

            // 메세지 전송
            await mainMessage(mainChannel, guildData);
        };

    } catch (error) {
        console.log('mainChannelUpdate.js 예외 : ', error);
        throw error;
    };
};

module.exports = mainChannelUpdate;