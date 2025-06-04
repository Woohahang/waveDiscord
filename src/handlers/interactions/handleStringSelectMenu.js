const gameMenuToggle = require("@modules/guildMenuControls/gameMenuToggle");
const toggleMenuHandler = require("@modules/guildMenuControls/toggleMenuHandler");
const deleteNickname = require("@modules/nicknameFlow/handlers/deleteNickname");
const submitNicknameModal = require("@modules/nicknameFlow/handlers/submitNicknameModal");
const handleRankView = require("@modules/rank/handleRankView");
const deleteUserInfo = require("@modules/userInfo/deleteUserInfo");
const showUserInfo = require("@modules/userInfo/showUserInfo");
const logger = require("@utils/logger");

async function handleStringSelectMenu(interaction) {
    const values = interaction.values;
    const customId = interaction.customId;

    switch (customId) {
        case 'gameMenu': // 닉네임 등록 모달 메뉴 생성
            await submitNicknameModal(interaction);
            break;

        case 'removeNickNames': // 닉네임 삭제 제출 -> DB 저장
            await deleteNickname(interaction);
            break;

        /* 서버 메뉴 보이기 or 숨기기 */
        case 'adminMenuId':
            // 게임 메뉴 띄우기
            if (values.includes('showMenu') || values.includes('hideMenu'))
                await gameMenuToggle(interaction);
            break;

        // 게임 메뉴 DB에 저장하고 서버 채널 업데이트
        case 'showMenu':
        case 'hideMenu':
            await toggleMenuHandler(interaction);
            break;

        case 'multitoolsMenu':
            if (values.includes('showUserInfo'))
                await showUserInfo(interaction);

            if (values.includes('deleteUserInfo'))
                await deleteUserInfo(interaction);
            break;

        case 'select-game-rank':
            await handleRankView(interaction);
            break;

        default:
            logger.error('[interaction.handleStringSelectMenu] Unknown customId', {
                customId,
                values
            })
    };
}

module.exports = handleStringSelectMenu;