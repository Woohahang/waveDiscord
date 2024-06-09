// nicknameModalCreator.js

const { ModalBuilder, TextInputBuilder, ActionRowBuilder, TextInputStyle } = require('discord.js');
const { menuSelectionResetter } = require('../../module/common/menuSelectionResetter');
const { description } = require('../../module/games/gameData');
const logUserInfo = require('../../utils/log/logUserInfo');

// 모달 생성
function buildModal(gameTitle) {
    try {
        const modal = new ModalBuilder()
            .setTitle(description[gameTitle])
            .setCustomId('submitNickname_' + gameTitle);

        const input = new TextInputBuilder()
            .setCustomId('submitNickname_' + gameTitle)
            .setLabel(gameTitle === 'steam' ? '✔️ 스팀 프로필 주소 또는 친구 코드를 작성해주세요.' : '✔️ 최대 다섯 개의 닉네임을 등록할 수 있습니다.')
            .setStyle(TextInputStyle.Short);

        const nicknameInputRow = new ActionRowBuilder().addComponents(input);

        modal.addComponents(nicknameInputRow);

        return modal;
    } catch (error) {
        console.error('nicknameModalCreator.js 의 buildModal 에러 : ', error);
    };
};


/* 모달 함수 */
module.exports = async (interaction) => {
    try {
        // 메뉴 선택을 초기화하는 함수
        await menuSelectionResetter(interaction);

        // 사용자의 상호작용에서 게임 제목을 추출합니다.
        const gameTitle = interaction.values[0];

        //  사용자가 'noOptions'을 선택한 경우 함수 종료
        if (gameTitle === 'noOptions') {
            return await interaction.deferUpdate();
        };

        // 모달 생성
        const modal = buildModal(gameTitle)

        // 생성한 모달을 사용자에게 보여줍니다.
        await interaction.showModal(modal);

    } catch (error) {
        console.error('nicknameModalCreator.js 에러 : ', error);
        logUserInfo(interaction);
    };
};