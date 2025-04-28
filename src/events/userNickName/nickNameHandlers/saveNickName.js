const UserSettings = require('../../../services/UserSettings');
const statusMessage = require('../nickNameModules/statusMessage');
const processNickname = require('../nickNameModules/processNickname');
const sendErrorMessage = require('../../../utils/errors/sendErrorMessage');
const errorMessages = require('../../../utils/errors/errorMessages');

/**
 * 사용자의 닉네임 입력을 처리하고, 게임 종류에 따라 전처리 후 DB에 저장합니다.
 */
module.exports = async (interaction) => {

    // 유저 ID 및 게임 종류, 입력된 닉네임 추출
    const userId = interaction.member.id;
    const gameType = interaction.customId.split('_')[1];
    const rawNickname = interaction.fields.getTextInputValue('nicknameInput');

    try {
        // 응답을 지연시켜 '처리 중...' 표시
        await interaction.deferReply({ ephemeral: true });

        // 닉네임 전처리
        const nickname = await processNickname(gameType, rawNickname);

        // 유저 설정 객체 생성 및 닉네임 저장
        const userSettings = new UserSettings(userId);
        const status = await userSettings.saveNickname(gameType, nickname);

        // 결과 메시지 전송
        await interaction.editReply({ content: statusMessage(status), ephemeral: true });

    } catch (error) {
        const code = error?.code;

        if (errorMessages[code])
            await sendErrorMessage(code, interaction);

        else
            console.error('[saveNickName] 닉네임 저장 중 오류 발생:', {
                userId,
                gameType,
                rawNickname,
                error
            });
    };
};