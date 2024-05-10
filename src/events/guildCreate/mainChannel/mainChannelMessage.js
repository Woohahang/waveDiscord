// mainChannelMessage.js

const guildSettingsSchema = require('../../../mongoDB/guildSettingsSchema');
const { gameMenuLoader } = require('../../../module/gameMenuLoader');
const { waveButton } = require('../../../module/adminModules/waveButton');



async function mainMessage(channel, guildId) {
    await channel.send({
        content: "## :star: Wave 메인 명령어\n## /닉네임등록  /닉네임삭제",
        components: [await gameMenuLoader(guildId)],
    });

    await channel.send({ components: [waveButton()] });
};


async function mainChannelMessage(guild) {
    try {
        // 길드 설정을 데이터베이스에서 찾기
        const guildId = guild.id;
        const guildSettingsData = await guildSettingsSchema.findOne({ guildId: guildId });

        // 찾은 데이터에서 mainChannelId 추출
        if (guildSettingsData && guildSettingsData.mainChannelId) {
            const channelId = guildSettingsData.mainChannelId;

            // 채널 ID를 이용하여 채널 객체 가져오기
            const channel = await guild.channels.cache.get(channelId);

            // 채널이 존재하면 메시지 전송
            if (channel) {
                mainMessage(channel, guildId);

            } else {
                console.error('채널을 찾을 수 없습니다.');
                // 기존에 있던 Wave 메인 채널을 찾을 수 없습니다.

            }
        } else {
            console.error('길드 설정 데이터를 찾을 수 없습니다.');
        }
    } catch (error) {
        console.error(error);
    }
}

module.exports = { mainChannelMessage, mainMessage }