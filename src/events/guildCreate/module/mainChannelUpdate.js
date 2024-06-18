const mainChannelCreate = require('../mainChannel/mainChannelCreate');
const deleteMessagesExcept = require('../../../module/common/deleteMessagesExcept');
const mainMessage = require('./mainMessage');

// 메인 채널 업데이트
async function mainChannelUpdate(guild, guildData) {
    let mainChannel;

    try {
        // 메인 채널 객체 얻기
        mainChannel = await guild.channels.fetch(guildData.mainChannelId);
    } catch (error) {
        if (error.code === 10003) { // 채널을 찾지 못한 경우
            mainChannel = await mainChannelCreate(guild);
        } else {
            // 다른 오류일 경우 예외를 던짐
            console.log(`채널을 가져오는 중 오류 발생: ${error.message}`);
            throw error;
        };
    };

    try {
        // 메세지 전송 및 메세지 Id 가지고 오기
        const messageIds = await mainMessage(mainChannel, guildData);

        // 전송한 메세지 제외 나머지 삭제
        await deleteMessagesExcept(mainChannel, messageIds);
    } catch (error) {
        console.log('메세지를 처리하는 중 예외 발생: ', error);
        throw error;
    };
};

module.exports = mainChannelUpdate;