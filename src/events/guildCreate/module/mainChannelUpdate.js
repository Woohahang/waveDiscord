// mainChannelUpdate.js

const mainChannelCreate = require('../mainChannel/mainChannelCreate');
const { messagesDelete } = require('../../../module/common/messagesDelete');
const mainMessage = require('./mainMessage');


// 메인 채널 업데이트
async function mainChannelUpdate(interaction, guildSettings) {

    const guild = interaction.guild;
    const channelType = 'mainChannel';

    const guildData = await guildSettings.loadOrCreate();
    // 길드 메인 채널 id
    const mainChannelId = await guildSettings.loadChannelId(channelType);

    try {
        // 메인 채널 객체 얻기
        const mainChannel = await guild.channels.fetch(mainChannelId);

        if (mainChannel) {
            // 메세지 전송
            const messageIds = await mainMessage(mainChannel, guildData);

            // 메세지 두개를 전송 못 했다면 리턴하라.
            if (messageIds.length !== 2) return interaction.reply({
                content: '오류가 발생해 메인 채널의 이전 메시지를 삭제하지 못했습니다. 번거롭겠지만 이전 메시지 삭제를 부탁드립니다.',
                ephemeral: true
            });

            // 메세지 두개를 잘 전송 했다면, 나머지 메세지를 삭제해라.
            await messagesDelete(mainChannel, messageIds);

        } else {
            // 메인 채널 생성
            await mainChannelCreate(guild);

            // 메세지 전송
            await mainMessage(mainChannel, guildData);

        };

    } catch (error) {
        console.error('mainChannelUpdate.js 에러 : ', error);
    }

};

module.exports = mainChannelUpdate;