const handleGameMenu = require('../interactions/selectMenus/handleGameMenu');
const logger = require("@utils/logger");

async function selectMenuHandler(interaction, dependencies) {
    const values = interaction.values;
    const customId = interaction.customId;

    switch (customId) {
        case 'gameMenu': // 닉네임 등록 모달 메뉴 생성
            return await handleGameMenu(interaction);

        default:
            logger.error('[interaction.handleStringSelectMenu] Unknown customId', {
                customId,
                values
            })
            return
    };
}

module.exports = selectMenuHandler;

