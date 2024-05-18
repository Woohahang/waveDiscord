// upDateButton.js

const GuildSettings = require('../../services/GuildSettings');

const adminChannelMessage = require('../guildCreate/adminChannel/adminChannelMessage');
const mainChannelMessage = require('../guildCreate/mainChannel/mainChannelMessage');

async function adminUpDate(interaction) {
    try {
        // 채널 메시지 수집
        const messages = await interaction.channel.messages.fetch({ limit: 10 });

        // 메시지 모두 삭제
        messages.forEach(message => {
            message.delete().catch(error => console.error(`deleteMessages() 메시지 삭제 중 오류 발생: ${error}`));
        });

        // 메시지 전송
        await adminChannelMessage(interaction.guild);
    } catch (error) {
        console.error('adminUpDate 에러 : ', error);
        throw error;
    };
};

async function mainUpDate(interaction) {
    try {
        // GuildSettings 인스턴스 생성
        const guildSettings = new GuildSettings(interaction.guild.id);

        // 길드 메인 채널 id
        const mainChannelId = await guildSettings.loadMainChannelId();

        const mainChannel = await interaction.guild.channels.resolve(mainChannelId);
        if (mainChannel) {
            // 채널 메시지 수집
            const messages = await mainChannel.messages.fetch({ limit: 10 });

            // 메시지 모두 삭제
            messages.forEach(message => {
                message.delete().catch(error => console.error(`deleteMessages() 메시지 삭제 중 오류 발생: ${error}`));
            });

            // 메시지 전송
            await mainChannelMessage(interaction.guild);
        };
    } catch (error) {
        console.error('mainUpDate 에러 : ', error);
        throw error;
    };
};

module.exports = async (interaction) => {
    try {
        // 관리자 채널 업데이트
        await adminUpDate(interaction);

        // 메인 채널 업데이트
        await mainUpDate(interaction);

    } catch (error) {
        console.error('upDateButton.js 에러', error);
    }
};