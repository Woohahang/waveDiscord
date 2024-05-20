// toggleMenuHandler.js

const guildSettingsSchema = require('../../mongoDB/guildSettingsSchema.js');
// const upDateButtonMenu = require('../../events/serverManagement/upDateButton.js');
const { serverUpDate } = require('../../events/guildCreate/adminChannel/module/serverUpDate');

async function toggleMenuHandler(interaction, action) {
    if (!interaction.isStringSelectMenu()) return;

    try {
        const selections = interaction.values;

        const targetGuildId = interaction.guildId;

        let visibilityData = await guildSettingsSchema.findOne({ guildId: targetGuildId });

        if (!visibilityData) {
            console.error('길드 데이터를 찾을 수 없습니다.');
            return;
        };

        selections.forEach(selection => {
            const gameKey = selection.replace(`${action}`, '');
            // 의도, DB 의 게임에 true 또는 false 적용
            visibilityData[gameKey] = action === 'showMenu' ? true : false;
        });

        // DB 저장
        await visibilityData.save();



        // 서버 모든 메뉴 업데이트
        await serverUpDate(interaction);

        const updateCompleted =
            '\n' + '## 업데이트 완료' +
            '\n' + '> * 닉네임 등록 채널 메뉴' +
            '\n' + '> * 음성 채널 입장 메뉴';

        // 업데이트 완료 알림 전송
        await interaction.update({ content: updateCompleted, components: [], ephemeral: true });

    } catch (error) {
        console.error(`메뉴 ${action} 처리 중 에러 발생:`, error);

        await interaction.reply({
            content: '오류가 발생했습니다. 다시 시도해주세요.',
            ephemeral: true
        });
    };
};

module.exports = { toggleMenuHandler };
