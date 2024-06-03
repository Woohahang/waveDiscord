// mainChannelMessage.js

const GuildSettings = require('../../../services/GuildSettings');

const gameMenu = require('../../../module/games/gameMenu');
const { waveButton } = require('../module/waveButton');


async function mainMessage(guildData, channel) {
    try {
        const componentsMessage = await channel.send({
            content: "## :star: Wave 메인 명령어\n## /닉네임등록  /닉네임삭제",
            components: [gameMenu(guildData)],
        });

        const message = await channel.send({ components: [waveButton()] });

        return [componentsMessage.id, message.id];
    } catch (error) {
        console.error('mainChannelMessage.js 의 mainMessage 에러 : ', error);
    }
};

module.exports = async (guild) => {
    const channelType = 'mainChannel';

    // 길드 인스턴스 생성 및 불러오기
    const guildSettings = new GuildSettings(guild.id);
    const guildData = await guildSettings.loadOrCreate();

    try {
        // 메인 채널 Id를 불러옴
        const mainChannelId = await guildSettings.loadChannelId(channelType);

        // 메인 채널 Id 객체 얻음
        const channel = await guild.channels.cache.get(mainChannelId);

        // 메세지 전송
        const messageIds = await mainMessage(guildData, channel);

        return messageIds;
    } catch (error) {
        console.error('mainChannelMessage.js 에러 : ', error);
    };
};