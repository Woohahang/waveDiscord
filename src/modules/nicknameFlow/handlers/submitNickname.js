const UserSettings = require('@services/UserSettings');
const logger = require('@utils/logger');
const sendStateMessage = require('@utils/discord/sendStateMessage');
const REPLY_METHODS = require('@constants/replyMethods');
const getNicknameValidationError = require('../utils/getNicknameValidationError');
const formatNicknameByGame = require('../utils/formatNicknameByGame');
const fetchUserGameData = require('../utils/fetchUserGameData');
const createUserGameEntry = require('../utils/createUserGameEntry');
const getNicknameAvailabilityError = require('../utils/getNicknameAvailabilityError');


/**
 * 사용자의 닉네임 입력을 처리하고, 게임 종류에 따라 전처리 후 DB에 저장합니다.
 * 
 * 현재 기능은 handleSubmitNickname() 함수에서 처리하도록 리팩터링함.
 */
module.exports = async (interaction) => {

    // 유저 ID 및 게임 종류, 입력된 닉네임 추출
    const userId = interaction.member.id;
    const { gameType } = JSON.parse(interaction.customId);
    const rawNickname = interaction.fields.getTextInputValue('nicknameInput');

    try {
        // // 응답을 지연시켜 '처리 중...' 표시
        // await interaction.deferReply({ ephemeral: true });

        // // 닉네임 유효성 검사
        // const validationErrorKey = getNicknameValidationError(gameType, rawNickname);
        // if (validationErrorKey)
        //     return await sendStateMessage(interaction, validationErrorKey, REPLY_METHODS.EDIT);

        // // 게임 타입에 맞는 닉네임 포맷터
        // const formattedNickname = formatNicknameByGame(gameType, rawNickname);

        // // 유저 설정 객체 생성 및 닉네임 DB 저장
        // const userSettings = new UserSettings(userId);
        // const userDoc = await userSettings.loadOrCreateDoc();

        // // 닉네임 사용 가능 여부 확인
        // const availabilityErrorKey = getNicknameAvailabilityError(userDoc, gameType, formattedNickname);
        // if (availabilityErrorKey)
        //     return await sendStateMessage(interaction, availabilityErrorKey, REPLY_METHODS.EDIT);

        // // 게임 유저 정보 조회 (게임 타입별)
        // const userGameData = await fetchUserGameData(gameType, formattedNickname);

        // // 게임 정보로 DB 저장용 닉네임 객체 생성
        // const nicknameEntry = createUserGameEntry(gameType, formattedNickname, userGameData);

        // // 닉네임이 유효하다면, 해당 닉네임을 DB에 저장
        // const resultKey = await userSettings.saveNickname(gameType, nicknameEntry);

        // // 결과 메시지 전송
        // await sendStateMessage(interaction, resultKey, REPLY_METHODS.EDIT);

    } catch (error) {
        logger.error('[submitNickname] 닉네임 저장 중 오류 발생', {
            userId,
            gameType,
            rawNickname,
            stack: error.stack
        });
    };
};