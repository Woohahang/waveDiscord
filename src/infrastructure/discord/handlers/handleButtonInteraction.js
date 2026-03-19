const CUSTOM_IDS = require('@shared/constants/interactionCustomIds');
const logger = require("@utils/logger");
const publishMainChannelUI = require('../guild/sendMainChannelUI');
const sendAdminChannelUI = require('../guild/sendAdminChannelUI');
const handleRemoveNicknameButton = require('../interactions/button/handleRemoveNicknameButton');

async function handleButtonInteraction(interaction, dependencies) {
    const customId = interaction.customId;
    const guild = interaction.guild;

    switch (customId) {
        case 'upDateButton':
            await publishMainChannelUI(guild, dependencies);
            await sendAdminChannelUI(guild, dependencies);
            break;

        case CUSTOM_IDS.USER.REMOVE_NICKNAME.BUTTON:
            await handleRemoveNicknameButton(interaction, dependencies);
            break;

        default:
            logger.error('[handleButtonInteraction] Unknown customId', {
                customId,
            });
    }

}

module.exports = handleButtonInteraction;