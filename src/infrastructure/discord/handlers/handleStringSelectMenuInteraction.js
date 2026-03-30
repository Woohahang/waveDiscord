const CUSTOM_IDS = require('@shared/constants/interactionCustomIds');
const handleRegisterNicknameSelectGame = require('../interactions/selectMenus/handleRegisterNicknameSelectGame');
const handleRemoveNicknameSelect = require('../interactions/selectMenus/handleRemoveNicknameSelect');
const handleGameVisibilityMenu = require('../interactions/selectMenus/handleGameVisibilityMenu');
const logger = require("@utils/logger");
const resetMenuSelection = require('@shared/utils/resetMenuSelection');
const handleSelectedGameVisibility = require('../interactions/selectMenus/handleSelectedGameVisibility');
const handleDeleteUserInfo = require('../interactions/selectMenus/handleDeleteUserInfo');

async function handleStringSelectMenuInteraction(interaction, dependencies) {
    const customId = interaction.customId;

    switch (customId) {
        case CUSTOM_IDS.USER.REGISTER_NICKNAME.SELECT_GAME:
            await handleRegisterNicknameSelectGame(interaction);
            break;

        case CUSTOM_IDS.USER.REMOVE_NICKNAME.SELECT_NICKNAMES:
            await handleRemoveNicknameSelect(interaction, dependencies);
            break;

        case CUSTOM_IDS.USER.INFO.SELECT:
            if (interaction.value = 'showUserInfo')
                // unserinfo();
                ""

            if (interaction.value = 'deleteUserInfo')
                await handleDeleteUserInfo(interaction, dependencies);
            break;

        case 'adminMenuId':
            await resetMenuSelection(interaction.message);
            await handleGameVisibilityMenu(interaction, dependencies);
            break;

        case CUSTOM_IDS.GUILD.GAME_VISIBILITY.SHOW_SELECT:
        case CUSTOM_IDS.GUILD.GAME_VISIBILITY.HIDE_SELECT:
            await handleSelectedGameVisibility(interaction, dependencies);
            break;

        default:
            logger.error('Unknown customId', {
                customId,
            })
    };
}

module.exports = handleStringSelectMenuInteraction;

