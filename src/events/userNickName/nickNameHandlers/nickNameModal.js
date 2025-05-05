const { ModalBuilder, TextInputBuilder, ActionRowBuilder, TextInputStyle, InteractionType } = require('discord.js');
const resetMenuSelection = require('../../../shared/utils/resetMenuSelection');
const { description } = require('../../../module/games/gameData');
const logger = require('@utils/logger');

// 모달 생성
function buildModal(gameType) {
    const modal = new ModalBuilder()
        .setTitle(description[gameType])
        .setCustomId('submitNickname_' + gameType);

    const input = new TextInputBuilder()
        .setCustomId('nicknameInput')
        .setLabel(gameType === 'steam' ? '✔️ 스팀 프로필 주소를 작성해주세요.' : '✔️ 최대 다섯 개의 닉네임을 등록할 수 있습니다.')
        .setStyle(TextInputStyle.Short);

    const nicknameInputRow = new ActionRowBuilder().addComponents(input);

    modal.addComponents(nicknameInputRow);

    return modal;
};

/* 모달 함수 */
module.exports = async (interaction) => {

    // 사용자의 상호작용에서 게임 제목을 추출합니다.
    const gameType = interaction.values[0];

    try {
        // 메시지 타입이 0(일반 텍스트 메시지)인 경우에만 메뉴 선택을 초기화합니다. 슬래시 커맨드는 작동하지 않습니다.
        if (interaction.message.type === 0) {
            await resetMenuSelection(interaction.message);
        };

        //  사용자가 'noOptions'을 선택한 경우 함수 종료
        if (gameType === 'noOptions') {
            return await interaction.deferUpdate();
        };

        // 모달을 생성합니다.
        const modal = buildModal(gameType)

        // 생성한 모달을 사용자에게 보여줍니다.
        await interaction.showModal(modal);

    } catch (error) {
        logger.error('[nickNameModal] 닉네임 모달 처리중 오류 발생', {
            gameType,
            stack: error.stack
        })
    };
};