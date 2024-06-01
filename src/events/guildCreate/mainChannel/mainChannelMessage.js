// mainChannelMessage.js

// const GuildSettings = require('../../../services/GuildSettings');
const GuildSettings = require('../../../services/GuildSettings');

const gameMenuLoader = require('../../../module/gameMenuLoader');
const { waveButton } = require('./waveButton');

async function mainMessage(guild, channel) {
    try {
        const componentsMessage = await channel.send({
            content: "## :star: Wave 메인 명령어\n## /닉네임등록  /닉네임삭제",
            components: [await gameMenuLoader(guild.id)],
        });

        const message = await channel.send({ components: [waveButton()] });

        return [componentsMessage.id, message.id];
    } catch (error) {
        console.error('mainChannelMessage.js 의 mainMessage 에러 : ', error);
    }
};

module.exports = async (guild) => {
    try {
        // GuildSettings 인스턴스 생성
        const guildSettings = new GuildSettings(guild.id);

        const channelType = 'mainChannel';

        // 길드 설정을 불러오거나 생성
        await guildSettings.loadOrCreate();

        // 메인 채널 Id를 불러옴
        const mainChannelId = await guildSettings.loadChannelId(channelType);

        // 메인 채널 Id 객체 얻음
        const channel = await guild.channels.cache.get(mainChannelId);

        // 메세지 전송
        const messageIds = await mainMessage(guild, channel);

        return messageIds;
    } catch (error) {
        console.error('mainChannelMessage.js 에러 : ', error);
    };
};