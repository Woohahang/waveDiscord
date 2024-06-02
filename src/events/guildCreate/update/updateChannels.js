// updateChannels.js

const GuildSettings = require('../../../services/GuildSettings');
const { sendAdminMessage } = require('../module/sendAdminMessage');
const { messagesDelete } = require('../../../module/common/messagesDelete');

const mainChannelCreate = require('../mainChannel/mainChannelCreate');
const mainChannelMessage = require('../mainChannel/mainChannelMessage');

// 관리자 채널 업데이트
async function adminChannelUpDate(interaction, guildSettings) {

    const guild = interaction.guild;
    const channelType = 'adminChannel';

    // 길드 관리자 채널 ID 얻기
    const adminChannelId = await guildSettings.loadChannelId(channelType);

    try {
        // 관리자 채널 객체 얻기
        const channel = await guild.channels.fetch(adminChannelId);

        // 메세지 전송 시도
        const messageIds = await sendAdminMessage(channel);

        if (messageIds.length === 2) {
            // 방금 보낸 메세지 제외, 나머지 삭제
            await messagesDelete(channel, messageIds);
        } else {
            interaction.reply({ content: '오류가 발생해 이전 메시지를 삭제하지 못했습니다. 번거롭겠지만 이전 메시지 삭제를 부탁드립니다.', ephemeral: true })
        };

    } catch (error) {
        console.error('updateChannels.js 의 adminChannelUpDate 에러 : ', error);
    };

};

// 메인 채널 업데이트
async function mainChannelUpdate(interaction, guildSettings) {

    const guild = interaction.guild;
    const channelType = 'mainChannel';

    // 길드 메인 채널 id
    const mainChannelId = await guildSettings.loadChannelId(channelType);

    try {
        // 메인 채널 객체 얻기
        const mainChannel = await guild.channels.fetch(mainChannelId);

        if (mainChannel) {
            // 메세지 전송
            const messageIds = await mainChannelMessage(guild);

            // 메세지 두개를 전송 못 했다면 리턴하라.
            if (messageIds.length !== 2) return interaction.reply({
                content: '오류가 발생해 메인 채널의 이전 메시지를 삭제하지 못했습니다. 번거롭겠지만 이전 메시지 삭제를 부탁드립니다.',
                ephemeral: true
            });

            // 메세지 두개를 잘 전송 했다면, 나머지 메세지를 삭제해라.
            await messagesDelete(mainChannel, messageIds);

        } else {
            // 메인 채널 생성
            await mainChannelCreate(guild);

            // 메세지 전송
            await mainChannelMessage(guild);
        };

    } catch (error) {
        console.error('updateChannels.js 의 mainChannelUpdate 에러 : ', error);
    }

};

/* 목적, Wave 채널 업데이트 */
module.exports = async (interaction) => {

    // 길드 인스턴스 생성
    const guildSettings = new GuildSettings(interaction.guild.id);

    try {
        // 관리자 채널, 메인 채널 업데이트 : 병렬 처리를 위해 Promise.all 
        await Promise.all([
            adminChannelUpDate(interaction, guildSettings),
            mainChannelUpdate(interaction, guildSettings)
        ]);

    } catch (error) {
        console.error('serverUpDate.js 에러 : ', error)
        interaction.reply({ content: '에러가 발생했습니다. 나중에 다시 시도해주세요.', ephemeral: true })
    };
};



/*
비동기 작업 : await guild.channels.fetch(adminChannelId);
특징 : discord api를 통해 최신 정보를 받을 수 있다.

동기 작업 : guild.channels.cache.get(adminChannelId);
특징 : 캐시 된 데이터를 빠르게 조회 한다.

동기 작업 : interaction.guild.channels.resolve(adminChannelId);
특징 : 캐시 된 데이터를 빠르게 조회 한다. 조금 더 유연하게 조회할 수 있다. 채널의 이름이나 컨텐트 등


결론 현재 코드는 채널 객체를 가지고 올 때 반드시 정확하게 가지고 와야한다. 느려도 된다.

빠르지만 불안정한(봇이 막 시작 되었거나, 채널이 방금 생성 되었을 경우 캐시되지 않아 예외 발생) 캐시를 사용하는 것 보다,

discord api 요청인 패치() 를 사용하여 항상 최신 상태의 정보를 제공 받는게 맞다.
*/