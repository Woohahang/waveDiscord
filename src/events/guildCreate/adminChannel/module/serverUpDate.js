// serverUpDate.js

const GuildSettings = require('../../../../services/GuildSettings');

const { messagesDelete } = require('../../../../module/common/messagesDelete');
const adminChannelMessage = require('../adminChannelMessage');

const mainChannelCreate = require('../../mainChannel/mainChannelCreate');
const mainChannelMessage = require('../../mainChannel/mainChannelMessage');



async function adminChannelUpDate(interaction) {
    try {
        // 채널의 최근 메세지 삭제
        await messagesDelete(interaction.channel);

        // 관리자 채널 메세지 보내기
        await adminChannelMessage(interaction.guild);

    } catch (error) {
        console.error('adminChannelUpDate 에러 : ', error);
    };
};

async function mainChannelUpdate(interaction) {
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

            return true;
        };

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