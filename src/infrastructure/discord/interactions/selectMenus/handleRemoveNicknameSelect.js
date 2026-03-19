const deleteMessageLater = require('@utils/discord/deleteMessageLater');
const getStateMessage = require('@shared/utils/stateMessage');
const logger = require('@utils/logger');

/**
 * 유저가 선택한 게임 닉네임들을 삭제합니다.
 *
 * @returns {Promise<void>} 
*/
module.exports = async function handleRemoveNicknameSelect(interaction, dependencies) {

    const userId = interaction.member.id;
    const nicknameEntryIds = interaction.values

    try {
        const result = await dependencies.removeNicknameUseCase.execute({
            userId,
            nicknameEntryIds
        });

        if (!result.ok)
            throw new Error("[handleRemoveNicknameSelect] 예상하지 못한 에러");

        // 상태 메시지를 포함한 결과 메시지를 업데이트합니다.
        const resultMessage = await interaction.update({
            content: getStateMessage(result.code),
            components: [],
            ephemeral: true
        });

        // 20초 뒤 결과 메세지를 삭제합니다.
        deleteMessageLater(resultMessage);

    } catch (error) {
        logger.error('[handleRemoveNicknameSelect] 닉네임 삭제 처리 중 오류 발생', {
            userId,
            rawInput: interaction.values,
            stack: error.stack
        })
    };
};