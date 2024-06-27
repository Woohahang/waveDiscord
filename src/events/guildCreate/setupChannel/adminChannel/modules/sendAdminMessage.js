const { adminMenuLoader } = require('../../../module/adminMenuLoader');
const { adminButton } = require('../../../module/adminButton');

const serverSettingsMessage = (guildData) =>
    '## :gear: 서버 설정\n' +
    '> ### :label: ' + '\n';


async function sendAdminMessage(channel, guildData) {
    try {
        await channel.send({
            content: '# ⭐ Wave 관리자 채널',
            components: [adminMenuLoader(), adminButton()],
        });

        await channel.send({
            content: serverSettingsMessage(guildData)
        });

    } catch (error) {
        console.error('sendAdminMessage.js 예외 : ', error);
    };
};

module.exports = sendAdminMessage;