// toggleMenuHandler.js

const guildSettingsSchema = require('../../mongoDB/guildSettingsSchema.js');
const upDateButtonMenu = require('../../events/serverManagement/upDateButton.js');

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

        await visibilityData.save();

        upDateButtonMenu(interaction);


    } catch (error) {
        console.error(`메뉴 ${action} 처리 중 에러 발생:`, error);

        await interaction.reply({
            content: '오류가 발생했습니다. 다시 시도해주세요.',
            ephemeral: true
        });
    };
};

module.exports = { toggleMenuHandler };
