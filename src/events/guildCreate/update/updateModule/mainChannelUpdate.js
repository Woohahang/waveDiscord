const createMainChannel = require('../../setupChannel/mainChannel/modules/createMainChannel');
const sendMainMessage = require('../../setupChannel/mainChannel/modules/sendMainMessage');
const deleteOldMessages = require('../updateModule/deleteOldMessages');

async function mainChannelUpdate(interaction, guildData) {
    let channel;

    try {
        channel = await interaction.guild.channels.fetch(guildData.mainChannelId);

    } catch (error) {
        if (error.code === 10003) { // 채널을 찾지 못한 경우
            channel = await createMainChannel(guild);
        } else {
            // 다른 오류일 경우 예외를 던짐
            console.log(`채널을 가져오는 중 오류 발생: ${error.message}`);
            throw error;
        };
    };

    try {
        // 메세지 전송
        await sendMainMessage(channel, guildData);

        // 옛날 메세지만 삭제
        await deleteOldMessages(channel);
    } catch (error) {
        console.log('메세지를 처리하는 중 예외 발생: ', error);
        throw error;
    };
};

module.exports = mainChannelUpdate;