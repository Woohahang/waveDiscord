const UserSettings = require('@services/UserSettings');
const logger = require('@utils/logger');
const sendStateMessage = require('@utils/discord/sendStateMessage');
const REPLY_METHODS = require('@constants/replyMethods');
const getNicknameValidationError = require('../../../../modules/nicknameFlow/utils/getNicknameValidationError');
const formatNicknameByGame = require('../../../../modules/nicknameFlow/utils/formatNicknameByGame');
const fetchUserGameData = require('../../../../modules/nicknameFlow/utils/fetchUserGameData');
const createUserGameEntry = require('../../../../modules/nicknameFlow/utils/createUserGameEntry');
const getNicknameAvailabilityError = require('../../../../modules/nicknameFlow/utils/getNicknameAvailabilityError');


module.exports = async function handleSubmitNickname(interaction, dependencies) {

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

        // 닉네임 유효성 검사
        const validationErrorKey = getNicknameValidationError(gameType, nickname);
        if (validationErrorKey)
            return await sendStateMessage(interaction, validationErrorKey, REPLY_METHODS.EDIT);

        // 게임 타입에 맞는 닉네임 포맷터
        const formattedNickname = formatNicknameByGame(gameType, nickname);

        // 유저 설정 객체 생성 및 닉네임 DB 저장
        const userSettings = new UserSettings(userId);
        const userDoc = await userSettings.loadOrCreateDoc();

        // 닉네임 사용 가능 여부 확인
        const availabilityErrorKey = getNicknameAvailabilityError(userDoc, gameType, formattedNickname);
        if (availabilityErrorKey)
            return await sendStateMessage(interaction, availabilityErrorKey, REPLY_METHODS.EDIT);

        // 게임 유저 정보 조회 (게임 타입별)
        const userGameData = await fetchUserGameData(gameType, formattedNickname);

        // 게임 정보로 DB 저장용 닉네임 객체 생성
        const nicknameEntry = createUserGameEntry(gameType, formattedNickname, userGameData);

        // 닉네임이 유효하다면, 해당 닉네임을 DB에 저장
        const resultKey = await userSettings.saveNickname(gameType, nicknameEntry);

        // 결과 메시지 전송
        await sendStateMessage(interaction, resultKey, REPLY_METHODS.EDIT);

    } catch (error) {
        logger.error('[submitNickname] 닉네임 저장 중 오류 발생', {
            userId,
            gameType,
            nickname,
            stack: error.stack
        });
    }


}