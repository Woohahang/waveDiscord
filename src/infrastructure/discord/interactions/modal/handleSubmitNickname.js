const getStateMessage = require('@shared/utils/stateMessage');
const logger = require('@utils/logger');

/**
 * @typedef {import('@application/nickname/usecases/registerNicknameUseCase')} RegisterNicknameUseCase
*/

/**
 * 닉네임 등록 모달 제출 처리 핸들러
 * 
 * @param {import('discord.js').ModalSubmitInteraction} interaction
 * @param {Object} dependencies
 * @param {RegisterNicknameUseCase} dependencies.registerNicknameUseCase
 * @return {Promise<voide>}
*/
module.exports = async function handleSubmitNickname(interaction, dependencies) {

    // 모달에서 입력된 필드 추출 (단일 input 구조)
    const field = interaction.fields.fields.first();

    // 필드가 존재하지 않는 경우 (비정상 상황)
    if (!field) {
        logger.error('[handleSubmitNickname] 입력 필드를 찾을 수 없습니다.');
        return;
    }

    const userId = interaction.member.id;
    const gameType = field.customId;             // customId = gameType (어떤 게임인지 구분)
    const userInput = field.value;               // 사용자가 입력한 닉네임

    try {
        // Discord는 3초 내 응답이 필요하므로 defer 처리
        await interaction.deferReply({ ephemeral: true });

        // 닉네임 등록 유스케이스 실행
        const result = await dependencies.registerNicknameUseCase
            .execute({
                userId,
                gameType,
                userInput
            });

        // 상태 코드 → 사용자 메시지 변환
        const stateMessage = getStateMessage(result.code);

        // 최종 응답 전송
        await interaction.editReply({
            content: stateMessage
        });

    } catch (error) {
        logger.error('[handleSubmitNickname] 닉네임 저장 중 오류 발생', {
            userId,
            gameType,
            userInput,
            stack: error.stack
        });
    }

}