const logger = require('@utils/logger');
const sendStateMessage = require('@utils/discord/sendStateMessage');
const REPLY_METHODS = require('@constants/replyMethods');

module.exports = async function handleSubmitNickname(interaction, dependencies) {

    // 제출된 모달 정보를 가지고 옵니다.
    const field = interaction.fields.fields.first();
    if (!field) {
        logger.error('[handleSubmitNickname] 입력 필드를 찾을 수 없습니다.');
        return;
    }

    const userId = interaction.member.id;
    const gameType = field.customId;
    const nickname = field.value;

    try {
        // 응답을 지연시켜 '처리 중...' 표시
        await interaction.deferReply({ ephemeral: true });

        const resultKey = await dependencies.registerNicknameUseCase.execute({
            userId,
            gameType,
            nickname
        });

        // 결과 메시지 전송
        await sendStateMessage(interaction, resultKey, REPLY_METHODS.EDIT);

    } catch (error) {
        logger.error('[handleSubmitNickname] 닉네임 저장 중 오류 발생', {
            userId,
            gameType,
            nickname,
            stack: error.stack
        });
    }


}