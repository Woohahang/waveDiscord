// upDateButton.js

const GuildSettings = require('../../services/GuildSettings');

const adminChannelMessage = require('../guildCreate/adminChannel/adminChannelMessage');
const mainChannelMessage = require('../guildCreate/mainChannel/mainChannelMessage');
const { messagesDelete } = require('../../module/common/messagesDelete');

async function adminUpDate(interaction) {
    try {
        // 이 전 메세지 삭제
        await messagesDelete(interaction.channel);

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
            // 이 전 메세지 삭제
            await messagesDelete(mainChannel);

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
    };
};