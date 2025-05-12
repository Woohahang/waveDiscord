const buildNicknameSelectMenu = require('../../../../../module/setup/buildNicknameSelectMenu');
const waveButton = require('../modules/waveButton');

const contentMessage =
    '## :star: Wave 메인 명령어' + '\n' +
    '## /닉네임등록  /닉네임삭제';

// Wave 메인 채널 메세지 전송 및 메세지 id 반환
async function sendMainMessage(channel, guildData) {
    try {
        // 첫 번째 메세지를 보냅니다.
        await channel.send({ content: contentMessage, components: [buildNicknameSelectMenu(guildData)] });

        // 두 번째 메세지를 보냅니다.
        await channel.send({ components: [waveButton()] });

    } catch (error) {
        console.error('sendMainMessage.js 예외 : ', error);
    };
};

module.exports = sendMainMessage;