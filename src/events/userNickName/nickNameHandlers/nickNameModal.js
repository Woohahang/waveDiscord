// nickNameModal.js

const { ModalBuilder, TextInputBuilder, ActionRowBuilder, TextInputStyle, InteractionType } = require('discord.js');
const resetMenuSelection = require('../../../module/common/resetMenuSelection');
const { description } = require('../../../module/games/gameData');
const logUserInfo = require('../../../utils/log/logUserInfo');

// 모달 생성
function buildModal(gameTitle) {
    try {
        const modal = new ModalBuilder()
            .setTitle(description[gameTitle])
            .setCustomId('submitNickname_' + gameTitle);

        const input = new TextInputBuilder()
            .setCustomId('submitNickname_' + gameTitle)
            .setLabel(gameTitle === 'steam' ? '✔️ 스팀 프로필 주소를 작성해주세요.' : '✔️ 최대 다섯 개의 닉네임을 등록할 수 있습니다.')
            .setStyle(TextInputStyle.Short);

        const nicknameInputRow = new ActionRowBuilder().addComponents(input);

        modal.addComponents(nicknameInputRow);

        return modal;
    } catch (error) {
        console.error('nickNameModal.js 의 buildModal 에러 : ', error);
    };
};

// 옛날 필드 체크
function UpdateRequired(gameTitle) {
    const waveUpdateRequiredGames = ['loL', 'tfT', 'steamBG', 'kakao'];
    return waveUpdateRequiredGames.includes(gameTitle);
};

/* 모달 함수 */
module.exports = async (interaction) => {
    try {
        // 슬래시 커맨드로 실행된 경우 메뉴 리셋을 건너뜁니다.
        if (!InteractionType.ApplicationCommand) {
            await resetMenuSelection(interaction);
        };

        // 사용자의 상호작용에서 게임 제목을 추출합니다.
        const gameTitle = interaction.values[0];

        //  사용자가 'noOptions'을 선택한 경우 함수 종료
        if (gameTitle === 'noOptions') {
            return await interaction.deferUpdate();
        };

        // gameTitle 이 옛날 필드명이면 업데이트 필요하다는 안내 전달
        if (UpdateRequired(gameTitle)) {
            return await interaction.reply({ content: '관리자님, Wave 업데이트가 필요합니다.', ephemeral: true });
        };

        // 모달 생성
        const modal = buildModal(gameTitle)

        // 생성한 모달을 사용자에게 보여줍니다.
        await interaction.showModal(modal);

    } catch (error) {
        console.error('nickNameModal.js 에러 : ', error);
        logUserInfo(interaction);
    };
};