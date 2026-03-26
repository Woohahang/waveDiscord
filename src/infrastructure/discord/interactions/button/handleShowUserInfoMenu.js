const { StringSelectMenuBuilder, StringSelectMenuOptionBuilder, ActionRowBuilder } = require('discord.js');
const logger = require('@utils/logger');
const CUSTOM_IDS = require('@shared/constants/interactionCustomIds');

/**
 * 사용자 [내 정보] 관련 메뉴를 생성하는 함수
 * 
 * - 내 정보 조회
 * - 내 정보 삭제
 * @returns {ActionRowBuilder} - Discord 컴포넌트 액션 로우
 */
function buildUserInfoSelectMenu() {
    const selectMenu = new StringSelectMenuBuilder()
        .setCustomId(CUSTOM_IDS.USER.INFO.SELECT)
        .setPlaceholder('선택 하세요 !')
        .addOptions(
            new StringSelectMenuOptionBuilder()
                .setLabel('내 정보 조회')
                .setDescription('등록 되어 있는 모든 정보를 확인합니다.')
                .setValue('showUserInfo'),
            new StringSelectMenuOptionBuilder()
                .setLabel('내 정보 삭제')
                .setDescription('등록 되어 있는 모든 정보를 삭제합니다.')
                .setValue('deleteUserInfo'),
        );

    const row = new ActionRowBuilder().addComponents(selectMenu);

    return row;
}

/**
 * 사용자에게 [내 정보] 메뉴를 응답으로 보여주는 핸들러
 * 
 * @param {import('discord.js').SelectMenuInteraction} interaction - Discord 상호작용 객체
 * @returns {Promise<void>}
 */
module.exports = async function handleShowUserInfoMenu(interaction) {
    const row = buildUserInfoSelectMenu();

    try {
        await interaction.reply({
            components: [row],
            ephemeral: true
        });

    } catch (error) {
        logger.error('[handleShowUserInfoMenu] 내 정보 메뉴 응답 실패', {
            customId: interaction.customId,
            errorName: error.name,
            errorMessage: error.message,
            stack: error.stack,
        });
    };

}