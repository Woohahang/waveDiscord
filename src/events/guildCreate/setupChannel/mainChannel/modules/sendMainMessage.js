const gameMenu = require('../../../../../module/games/gameMenu');
const { waveButton } = require('../../../module/waveButton');

// Wave 메인 채널 메세지 전송 및 메세지 id 반환
async function sendMainMessage(channel, guildData) {
    try {
        await channel.send({
            content: "## :star: Wave 메인 명령어\n## /닉네임등록  /닉네임삭제",
            components: [gameMenu(guildData)],
        });

        await channel.send({ components: [waveButton()] });

    } catch (error) {
        console.error('sendMainMessage.js 예외 : ', error);
    };
};

module.exports = sendMainMessage;