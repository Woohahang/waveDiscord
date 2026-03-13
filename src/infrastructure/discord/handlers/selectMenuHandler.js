const handleGameMenu = require('../interactions/selectMenus/handleGameMenu');
const handleRemoveNicknamesMenu = require('../interactions/selectMenus/handleRemoveNicknamesMenu');
const logger = require("@utils/logger");

async function selectMenuHandler(interaction, dependencies) {
    const values = interaction.values;
    const customId = interaction.customId;

    switch (customId) {
        case 'gameMenu': // 닉네임 등록 모달 메뉴 생성
            return await handleGameMenu(interaction);

        case 'removeNickNames': //  등록된 닉네임이 보이는 메뉴에서 선택된 닉네임을 삭제 처리함
            return await handleRemoveNicknamesMenu(interaction, dependencies);

        default:
            logger.error('[interaction.handleStringSelectMenu] Unknown customId', {
                customId,
                values
            })
            return
    };
}

module.exports = selectMenuHandler;

