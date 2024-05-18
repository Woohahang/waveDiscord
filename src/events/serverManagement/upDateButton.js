// upDateButton.js

const GuildSettings = require('../../services/GuildSettings');

const adminChannelMessage = require('../guildCreate/adminChannel/adminChannelMessage');
const mainChannelMessage = require('../guildCreate/mainChannel/mainChannelMessage');
const { messagesDelete } = require('../../module/common/messagesDelete');


const mainChannelCreate = require('../guildCreate/mainChannel/mainChannelCreate');

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

        // 메인 채널 객체 가지고 오기
        const mainChannel = await interaction.guild.channels.resolve(mainChannelId);

        // 메인 채널을 찾았다
        if (mainChannel) {
            // 이 전 메세지 삭제
            await messagesDelete(mainChannel);

            // 메시지 전송
            await mainChannelMessage(interaction.guild);
        } else {
            // else : 메인 채널 삭제 했나? 못 찾았다면

            // 메인 채널 생성
            await mainChannelCreate(interaction.guild);

            // 메인 채널 메세지 전송
            await mainChannelMessage(interaction.guild);

            await interaction.reply({ content: '> 닉네임 등록 채널을 찾지 못해 하나 만들었어요 !\n> 혹시 옛날 닉네임 등록 채널이 남아있다면 삭제 부탁해요 !', ephemeral: true });
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