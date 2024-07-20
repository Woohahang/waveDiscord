const adminMenuLoader = require('../modules/adminMenuLoader');
const adminButton = require('../modules/adminButton');


function serverSettingsMessage(guildData) {

    // let message =
    // '## :gear: 서버 설정' + '\n' +
    // '> ### :label: ' + '\n';

    let message =
        '> * 채널 보기 권한 OFF 적용 상태' + '\n' +
        '> * 채널 보기 OFF 를 유지해 주세요.';

    return message;
};


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
        throw error;
    };
};

module.exports = sendAdminMessage;