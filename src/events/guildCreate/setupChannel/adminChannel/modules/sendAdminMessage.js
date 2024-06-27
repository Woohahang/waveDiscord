const { adminMenuLoader } = require('../../../module/adminMenuLoader');
const { adminButton } = require('../../../module/adminButton');

// 서버 설정 메시지를 구성하는 함수입니다.
const serverSettingsMessage = (guildData) =>
    '## :gear: 서버 설정\n' +
    '> ### :label: ' + '\n';


async function sendAdminMessage(channel, guildData) {
    try {
        // 관리자 채널에 첫 번째 메시지를 보냅니다.
        await channel.send({
            content: '# ⭐ Wave 관리자 채널',
            components: [adminMenuLoader(), adminButton()],
        });

        // 관리자 채널에 서버 설정 메시지를 보냅니다.
        await channel.send({
            content: serverSettingsMessage(guildData)
        });

    } catch (error) {
        console.error('sendAdminMessage.js 예외 : ', error);
    };
};

module.exports = sendAdminMessage;