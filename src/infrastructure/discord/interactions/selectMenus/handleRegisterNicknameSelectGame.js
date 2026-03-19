const logger = require('@utils/logger');
const buildNicknameModal = require('../../components/buildNicknameModal');
const resetMenuSelection = require('@shared/utils/resetMenuSelection');


module.exports = async function handleRegisterNicknameSelectGame(interaction) {

    // 사용자의 상호작용에서 게임 제목을 추출합니다.
    const gameType = interaction.values[0];

    try {
        // 일반 텍스트 메시지에서 메뉴를 사용한 경우, 기존 선택을 초기화합니다. | [/닉네임등록] 사용한 경우 작동하지 않습니다.
        if (interaction.message.type === 0)
            await resetMenuSelection(interaction.message);

        // 등록 가능한 게임이 없을 경우 아무 작업도 하지 않습니다.
        if (gameType === 'noOptions')
            return await interaction.deferUpdate();

        const modal = buildNicknameModal(gameType);
        await interaction.showModal(modal);

    } catch (error) {
        logger.error('[handleRegisterNicknameSelectGame] 닉네임 모달 처리 중 오류 발생', {
            gameType,
            stack: error.stack
        })
    }

}