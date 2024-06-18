// mainChannelUpdate.js

const mainChannelCreate = require('../mainChannel/mainChannelCreate');
const deleteMessagesExcept = require('../../../module/common/deleteMessagesExcept');
const mainMessage = require('./mainMessage');


// 메인 채널 업데이트
async function mainChannelUpdate(interaction, guildData) {
    try {
        const guild = interaction.guild;

        // 메인 채널 객체 얻기
        const mainChannel = await guild.channels.fetch(guildData.mainChannelId);

        if (mainChannel) {
            // 메세지 전송
            const messageIds = await mainMessage(mainChannel, guildData);

            // 메세지 두개를 전송 못 했다면 리턴하라.
            if (messageIds.length !== 2) {
                await interaction.reply({
                    content: '오류가 발생해 메인 채널의 이전 메시지를 삭제하지 못했습니다. 번거롭겠지만 이전 메시지 삭제를 부탁드립니다.',
                    ephemeral: true
                });
                return;
            };

            // 메세지 두개를 잘 전송 했다면, 나머지 메세지를 삭제해라.
            await deleteMessagesExcept(mainChannel, messageIds);

        } else {
            // 메인 채널 생성
            await mainChannelCreate(guild);

            // 메세지 전송
            await mainMessage(mainChannel, guildData);

        };

    } catch (error) {
        throw error;
    };
};

module.exports = mainChannelUpdate;