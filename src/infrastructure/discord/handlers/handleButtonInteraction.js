const CUSTOM_IDS = require('@shared/constants/interactionCustomIds');
const logger = require("@utils/logger");
const handleRemoveNicknameButton = require('../interactions/button/handleRemoveNicknameButton');
const handleSyncGuildAndRefreshUI = require('../interactions/button/handleSyncGuildAndRefreshUI');
const handleShowUserInfoMenu = require('../interactions/button/handleShowUserInfoMenu');

async function handleButtonInteraction(interaction, dependencies) {
    const customId = interaction.customId;

    switch (customId) {
        case 'upDateButton':
            await handleSyncGuildAndRefreshUI(interaction, dependencies);
            break;

        case CUSTOM_IDS.USER.REMOVE_NICKNAME.BUTTON:
            await handleRemoveNicknameButton(interaction, dependencies);
            break;

        case CUSTOM_IDS.USER.INFO.BUTTON:
            await handleShowUserInfoMenu(interaction);
            break;

        default:
            logger.error('[handleButtonInteraction] Unknown customId', {
                customId,
            });
    }

}

module.exports = handleButtonInteraction;