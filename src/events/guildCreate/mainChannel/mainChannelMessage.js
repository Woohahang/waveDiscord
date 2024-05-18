// mainChannelMessage.js

const GuildSettings = require('../../../services/GuildSettings');

const gameMenuLoader = require('../../../module/gameMenuLoader');
const { waveButton } = require('./waveButton');

module.exports = async (guild) => {
    try {
        // GuildSettings 인스턴스 생성
        const guildSettings = new GuildSettings(guild.id);

        // 길드 설정을 불러오거나 생성
        await guildSettings.loadOrCreate();

        // 메인 채널 Id를 불러옴
        const mainChannelId = await guildSettings.loadMainChannelId();

        // 메인 채널 Id 객체 얻음
        const channel = await guild.channels.cache.get(mainChannelId);

        // 채널 찾으면 채팅 전송
        if (channel) {
            await channel.send({
                content: "## :star: Wave 메인 명령어\n## /닉네임등록  /닉네임삭제",
                components: [await gameMenuLoader(guild.id)],
            });

            await channel.send({ components: [waveButton()] });

            // 못 찾으면  ... 구현 해야 됨
        } else {
            console.log('채널 없을 때 그 머냐 다시 만드는거 해야될듯');
        };

    } catch (error) {
        console.error('mainChannelMessage.js 에러 : ', error);
    };
};