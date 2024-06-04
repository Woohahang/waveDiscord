// mainMessage.js

const gameMenu = require('../../../module/games/gameMenu');
const { waveButton } = require('./waveButton');

// Wave 메인 채널 메세지 전송 및 메세지 id 반환
async function mainMessage(channel, guildData) {

    const message1 =
        await channel.send({
            content: "## :star: Wave 메인 명령어\n## /닉네임등록  /닉네임삭제",
            components: [gameMenu(guildData)],
        });

    const message2 =
        await channel.send({ components: [waveButton()] });

    return [message1.id, message2.id];

};

module.exports = mainMessage;