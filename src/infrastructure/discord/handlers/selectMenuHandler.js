const gameMenu = require('../interactions/selectMenus/gameMenu');
const removeNicknamesMenu = require('../interactions/selectMenus/removeNicknamesMenu');
const logger = require("@utils/logger");

async function selectMenuHandler(interaction, dependencies) {
    const customId = interaction.customId;
    const values = interaction.values;

    switch (customId) {
        case 'gameMenu': // 닉네임 등록 모달 메뉴 생성
            await gameMenu(interaction);

        case 'removeNickNames': //  등록된 닉네임이 보이는 메뉴에서 선택된 닉네임을 삭제 처리함
            await removeNicknamesMenu(interaction, dependencies);

        default:
            logger.error('[interaction.handleStringSelectMenu] Unknown customId', {
                customId,
                values
            })
    };
}

module.exports = selectMenuHandler;

