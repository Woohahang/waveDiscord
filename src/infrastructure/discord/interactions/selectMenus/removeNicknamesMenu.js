const deleteMessageLater = require('@utils/discord/deleteMessageLater');
const getStateMessage = require('@shared/utils/stateMessage');
const logger = require('@utils/logger');

/**
 * @typedef {Object} NicknameEntry
 * @property {string} gameType - 게임 종류 (예: 'leagueOfLegends', 'steam' 등)
 * @property {string} nickname - 게임 내 닉네임
 */

/**
 * Discord 상호작용(interaction) 핸들러로, 유저가 선택한 게임 닉네임들을 삭제합니다.
 *
 * @returns {Promise<void>} 
*/
module.exports = async function removeNicknamesMenu(interaction, dependencies) {

    const userId = interaction.member.id;
    const nicknamesToRemove = interaction.values.map(JSON.parse);

    try {
        const resultKey = await dependencies.removeNicknameUseCase.execute({
            userId,
            nicknamesToRemove
        });

        // 상태 메시지를 포함한 결과 메시지를 업데이트합니다.
        const resultMessage = await interaction.update({
            content: getStateMessage(resultKey),
            components: [],
            ephemeral: true
        });

        // 20초 뒤 결과 메세지를 삭제합니다.
        deleteMessageLater(resultMessage);

    } catch (error) {
        logger.error('[deleteNickname] 닉네임 삭제 처리 중 오류 발생', {
            userId,
            rawInput: interaction.values,
            stack: error.stack
        })
    };
};