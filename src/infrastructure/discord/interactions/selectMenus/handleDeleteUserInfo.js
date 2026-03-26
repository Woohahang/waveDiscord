const getStateMessage = require("@shared/utils/stateMessage");
const logger = require("@utils/logger")

/**
 * 사용자 정보를 완전히 삭제합니다.
 *
 * @param {import('discord.js').StringSelectMenuInteraction} interaction
 * @param {Object} dependencies
 * @returns {Promise<void>}
*/
module.exports = async function handleDeleteUserInfo(interaction, dependencies) {

    const userId = interaction.user.id;

    try {
        const result = await dependencies.deleteUserInfoUseCase
            .execute({ userId });

        await interaction.update({
            content: getStateMessage(result.code),
            components: [],
            ephemeral: true
        });

    } catch (error) {
        logger.error("[handleDeleteUserInfo] 유저 정보 삭제 중 에러", {
            userId,
            customId: interaction.customId,
            errorName: error.name,
            errorMessage: error.message,
            stack: error.stack,
        });
    }
}