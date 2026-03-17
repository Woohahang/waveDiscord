const onGuildUpdateButtonPressed = require("@modules/guildUpdate/onGuildUpdateButtonPressed");
const deleteNicknameMenu = require("@modules/nicknameFlow/handlers/deleteNicknameMenu");
const createUserInfoSelectMenu = require("@modules/userInfo/createUserInfoSelectMenu");
const logger = require("@utils/logger");

async function handleButtonInteraction(interaction) {
    const customId = interaction.customId;

    switch (customId) {
        case 'upDateButton':
            // await onGuildUpdateButtonPressed(interaction);
            break;

        case 'removeButton':
            await deleteNicknameMenu(interaction);
            break;

        case 'multitoolsButton':
            await createUserInfoSelectMenu(interaction);
            break;

        default:
            logger.error('[interaction.handleButtonInteraction] Unknown customId', {
                customId
            });
    }
}

module.exports = handleButtonInteraction;