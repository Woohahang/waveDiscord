// serverUpDate.js

const GuildSettings = require('../../../../services/GuildSettings');

const { messagesDelete } = require('../../../../module/common/messagesDelete');
const adminChannelMessage = require('../adminChannelMessage');

const mainChannelCreate = require('../../mainChannel/mainChannelCreate');
const mainChannelMessage = require('../../mainChannel/mainChannelMessage');



async function adminChannelUpDate(interaction) {
    try {
        // 관리자 채널 메세지 보내기
        const messageIds = await adminChannelMessage(interaction.guild)

        // 변경 된 메세지 제외 전부 삭제
        await messagesDelete(interaction.channel, messageIds);

    } catch (error) {
        console.error('adminChannelUpDate 에러 : ', error);

        await interaction.reply({ content: '오류가 발생했습니다. 잠시 후 다시 시도해주세요.', ephemeral: true });
    };
};

async function mainChannelUpdate(interaction) {
    try {
        // GuildSettings 인스턴스 생성
        const guildSettings = new GuildSettings(interaction.guild.id);

        const channelType = 'mainChannel';

        // 길드 메인 채널 id
        const mainChannelId = await guildSettings.loadChannelId(channelType);

        // 메인 채널 객체 가지고 오기
        const mainChannel = await interaction.guild.channels.resolve(mainChannelId);

        // 메인 채널을 찾았다
        if (mainChannel) {

            // 메시지 전송
            const messageIds = await mainChannelMessage(interaction.guild);

            // 최근 메세지 제외 삭제
            await messagesDelete(mainChannel, messageIds);

            // 메인 채널을 못 찾았다면
        } else {
            // 메인 채널 생성
            await mainChannelCreate(interaction.guild);

            // 메인 채널 메세지 전송
            await mainChannelMessage(interaction.guild);

            return true;
        };


        // 여기 리팩토링 해야겠다. 메세지 전송 성공하면 메세지 삭제 하는걸로


    } catch (error) {
        console.error('mainChannelUpdate 에러 : ', error);
    };
};



// 여기  Promise.all 을 사용하여 비동기 처리를 병렬로 하면 조금 더 빠르다.

async function serverUpDate(interaction) {
    try {
        // 관리자 채널과 메인 채널을 업데이트 : 병렬 처리를 위해 Promise.all 
        await Promise.all([
            adminChannelUpDate(interaction),
            mainChannelUpdate(interaction)
        ]);

    } catch (error) {
        console.error('serverUpDate.js 에러 : ', error)
        interaction.reply({ content: '에러가 발생했습니다. 나중에 다시 시도해주세요.', components: [], ephemeral: true })
    };
};

module.exports = { serverUpDate };