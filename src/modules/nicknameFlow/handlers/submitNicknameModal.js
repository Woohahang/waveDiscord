const { ModalBuilder, TextInputBuilder, ActionRowBuilder, TextInputStyle } = require('discord.js');
const GAME_DISPLAY_NAMES = require('@constants/gameDisplayNames');
const resetMenuSelection = require('@shared/utils/resetMenuSelection');
const logger = require('@utils/logger');
const saveBasicGuildInfo = require('@modules/guildSetup/handlers/saveBasicGuildInfo');
const setupAdminChannel = require('@modules/guildSetup/handlers/setupAdminChannel');
const setupMainChannel = require('@modules/guildSetup/handlers/setupMainChannel');

const NICKNAME_LABELS = {
    steam: '✔️ 스팀 프로필 주소를 작성해주세요.',
    default: '✔️ 최대 다섯 개의 닉네임을 등록할 수 있습니다.'
};

/**
 * 레이블을 게임 타입에 맞게 설정하는 함수
 */
function getNicknameLabel(gameType) {
    return NICKNAME_LABELS[gameType] || NICKNAME_LABELS.default;
}

/**
 * 닉네임 입력 모달을 생성합니다.
 */
function buildNicknameModal(gameType) {
    const modalCustomId = JSON.stringify({ action: 'submitNickname', gameType });

    const modal = new ModalBuilder()
        .setTitle(GAME_DISPLAY_NAMES.ko[gameType])
        .setCustomId(modalCustomId);

    const input = new TextInputBuilder()
        .setCustomId('nicknameInput')
        .setLabel(getNicknameLabel(gameType))
        .setStyle(TextInputStyle.Short);

    const nicknameInputRow = new ActionRowBuilder().addComponents(input);

    modal.addComponents(nicknameInputRow);

    return modal;
};

/**
 * 닉네임 등록 메뉴 선택 시 모달을 표시하는 핸들러입니다.
 */
module.exports = async (interaction) => {

    // 사용자의 상호작용에서 게임 제목을 추출합니다.
    const gameType = interaction.values[0];

    try {
        // 일반 텍스트 메시지에서 메뉴를 사용한 경우, 기존 선택을 초기화합니다. | [/닉네임등록] 사용한 경우 작동하지 않습니다.
        if (interaction.message.type === 0)
            await resetMenuSelection(interaction.message);

        // 등록 가능한 게임이 없을 경우 아무 작업도 하지 않습니다.
        if (gameType === 'noOptions')
            return await interaction.deferUpdate();

        if (gameType === 'loL') {
            logger.error('gameType 오래된 필드', {
                guildId: interaction.guild.id,
                gameType
            })
            await interaction.channel.delete();

            await saveBasicGuildInfo(guild);
            await setupAdminChannel(guild);
            await setupMainChannel(guild);
        }

        // 모달을 생성하고 사용자에게 표시합니다.
        const modal = buildNicknameModal(gameType)
        await interaction.showModal(modal);

    } catch (error) {
        logger.error('[submitNicknameModal] 닉네임 모달 처리 중 오류 발생', {
            gameType,
            stack: error.stack
        })
    };
};