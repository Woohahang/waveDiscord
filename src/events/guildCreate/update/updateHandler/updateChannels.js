const GuildSettings = require('../../../../services/GuildSettings');
const checkAdminRole = require('../../../../module/role/checkAdminRole'); // 관리자 체크
const adminChannelUpDate = require('../../module/adminChannelUpDate'); // 관리자 채널 업데이트
const mainChannelUpdate = require('../../module/mainChannelUpdate'); // 메인 채널 업데이트
const emojiUpdate = require('../../guildEmoji/emojiHandler/emojiUpdate'); // 이모지 업데이트
const { updateCompleted, updateFailed, updateEmojiFailed } = require('../updateModule/message'); // 업데이트 상태 메세지


module.exports = async (interaction) => {
    try {
        // 사용자 권한 체크
        if (!checkAdminRole(interaction)) {
            await interaction.reply({ content: '관리자 메뉴에 접근할 권한이 없습니다.', ephemeral: true });
            return;
        };

        const guild = interaction.guild;
        const guildSettings = new GuildSettings(guild.id); // 길드 인스턴스 생성
        const guildData = await guildSettings.loadOrCreate(); // 길드 데이터 불러오기

        // '업데이트 중' 메시지 전송
        await interaction.deferReply({ ephemeral: true });

        // 모든 업데이트 작업을 병렬로 실행
        await Promise.all([
            adminChannelUpDate(guild, guildData),
            mainChannelUpdate(guild, guildData),
            emojiUpdate(guild)
        ]);

        // 업데이트 완료 메세지 전송
        await interaction.editReply({ content: updateCompleted, components: [], ephemeral: true });

    } catch (error) {
        switch (error.code) {
            case 'EMOJI_SLOT_ERROR': // 이모지 슬롯 초과
                interaction.editReply({ content: updateEmojiFailed, ephemeral: true });
                break;

            default:  // 다른 모든 에러
                interaction.editReply({ content: updateFailed, ephemeral: true });
                console.error('updateChannels.js 업데이트 실패 : ', error);
        };
    };
};


/*
목적 : 채널 객체 얻기

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