// toggleMenuHandler.js

const visibilitySchema = require('../mongoDB/visibilitySchema.js');

async function toggleMenuHandler(interaction, action) {
    if (!interaction.isStringSelectMenu()) return;

    // gameMenuToggle.js 에서 StringSelectMenuBuilder 의 valu 를 0으로 초기화


    try {
        const selections = interaction.values;

        const targetGuildId = interaction.guildId;

        let visibilityData = await visibilitySchema.findOne({ guildId: targetGuildId });

        if (!visibilityData) {
            console.error('길드 데이터를 찾을 수 없습니다.');
            return;
        }

        selections.forEach(selection => {
            const gameKey = selection.replace(`${action}`, '');
            // 의도, DB 의 게임에 true 또는 false 적용
            visibilityData[gameKey] = action === 'hideMenu' ? true : false;
        });

        await visibilityData.save();

        await interaction.reply({
            content: action === 'hideMenu' ? '선택한 게임을 메뉴에서 숨겼습니다.' : '선택한 게임 메뉴가 나타납니다.',
            ephemeral: true
        });

    } catch (error) {
        console.error(`메뉴 ${action} 처리 중 에러 발생:`, error);

        await interaction.reply({
            content: '오류가 발생했습니다. 다시 시도해주세요.',
            ephemeral: true
        });
    }
}

module.exports = { toggleMenuHandler };
