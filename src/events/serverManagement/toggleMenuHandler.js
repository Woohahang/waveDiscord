// toggleMenuHandler.js

const GuildSettings = require('../../services/GuildSettings');

const adminChannelUpDate = require('../guildCreate/module/adminChannelUpDate');
const mainChannelUpdate = require('../guildCreate/module/mainChannelUpdate');

async function toggleMenuHandler(interaction, action) {
    try {
        if (!interaction.isStringSelectMenu()) return;

        const selections = interaction.values;

        // 길드 인스턴스 생성
        const guildSettings = new GuildSettings(interaction.guild.id);

        // 길드 데이터
        let guildData = await guildSettings.loadOrCreate();

        selections.forEach(selection => {
            const gameKey = selection.replace(`${action}`, '');
            // 의도, DB 의 게임에 true 또는 false 적용
            guildData[gameKey] = action === 'showMenu' ? true : false;
        });

        // DB 저장
        await guildData.save();

        // 서버 채널 업데이트
        await Promise.all([
            adminChannelUpDate(interaction, guildSettings),
            mainChannelUpdate(interaction, guildSettings)
        ]);

        const updateCompleted =
            '\n' + '## 업데이트 완료' +
            '\n' + '> * 닉네임 등록 채널 메뉴' +
            '\n' + '> * 음성 채널 입장 메뉴';

        // 업데이트 완료 알림 전송
        await interaction.update({ content: updateCompleted, components: [], ephemeral: true });

    } catch (error) {
        console.error('toggleMenuHandler.js 에러 : ', error);

        await interaction.reply({
            content: '오류가 발생했습니다. 다시 시도해주세요.',
            ephemeral: true
        });
    };
};

module.exports = { toggleMenuHandler };
