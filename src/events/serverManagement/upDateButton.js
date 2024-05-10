// upDateButton.js

const guildSettingsSchema = require('../../mongoDB/guildSettingsSchema');
const { mainMessage } = require('../../events/guildCreate/mainChannel/mainChannelMessage');
const { adminMessage } = require('../guildCreate/adminChannel/adminChannelMessage');

function upDateMessage() {
    let message;

    message = '## 업데이트 완료' + '\n';
    message += '> * 현재 **Wave** 는 보완과 개발 단계에 있습니다. ' + '\n';
    message += '> * 개발은 지금도 진행 중이며 가끔 업데이트 버튼을 눌러주세요.' + '\n';
    // message += '## 안내' + '\n';
    // message += '> * 14일이 지난 메시지는 Discord 프로그래밍 방식에 의해 삭제가 불가능 합니다.' + '\n';
    // message += '> * 삭제가 되지 않은 메시지가 있다면 이전 메시지는 편의를 위해 삭제해 주세요.'

    return message;
};

async function deleteMessages(channel) {
    try {
        const messages = await channel.messages.fetch({ limit: 10 });
        // await channel.bulkDelete(messages);
        messages.forEach(message => {
            message.delete().catch(error => console.error(`deleteMessages() 메시지 삭제 중 오류 발생: ${error}`));
        });
    } catch (error) {
        console.error(`메시지 삭제 중 오류 발생: ${error}`);
    };
};

async function adminChannelUpDate(interaction) {
    const channel = interaction.channel;

    // 관리자 채널 메시지 전부 삭제
    await deleteMessages(channel);

    // 관리자 채널 메시지 전송
    await adminMessage(channel);
}

async function mainChannelUpDate(interaction) {
    try {
        // 길드 메인 채널 id 가지고 오기
        const guildId = interaction.guild.id;
        const guildSettings = await guildSettingsSchema.findOne({ guildId: guildId });


        if (guildSettings && guildSettings.mainChannelId) {
            const mainChannel = await interaction.guild.channels.resolve(guildSettings.mainChannelId);
            if (mainChannel) {
                // 길드 메인 채널 메시지 전부 삭제
                await deleteMessages(mainChannel);

                // 길드 메인 채널 메시지 전송
                await mainMessage(mainChannel, guildId);
            }
        }
    } catch (error) {
        console.error(`메인 채널 업데이트 중 오류 발생: ${error}`);
    }
}

async function upDateButton(interaction) {
    await Promise.all([adminChannelUpDate(interaction), mainChannelUpDate(interaction)]);

    // 업데이트 내용 알림
    await interaction.reply({
        content: upDateMessage(),
        ephemeral: true
    });
}


module.exports = { upDateButton };