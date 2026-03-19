const CUSTOM_IDS = require('@shared/constants/interactionCustomIds');
const handleRegisterNicknameSelectGame = require('../interactions/selectMenus/handleRegisterNicknameSelectGame');
const handleRemoveNicknameSelect = require('../interactions/selectMenus/handleRemoveNicknameSelect');
const logger = require("@utils/logger");

async function handleSelectMenuInteraction(interaction, dependencies) {
    const customId = interaction.customId;

    switch (customId) {
        case CUSTOM_IDS.USER.REGISTER_NICKNAME.SELECT_GAME:
            await handleRegisterNicknameSelectGame(interaction);
            break;

        case CUSTOM_IDS.USER.REMOVE_NICKNAME.SELECT_NICKNAMES:
            await handleRemoveNicknameSelect(interaction, dependencies);
            break;

        default:
            logger.error('[handleSelectMenuInteraction] Unknown customId', {
                customId,
            })
    };
}

module.exports = handleSelectMenuInteraction;

