const { Events } = require('discord.js');
const handleCommandInteraction = require('../handlers/handleCommandInteraction');
const handleButtonInteraction = require('../handlers/handleButtonInteraction');
const handleStringSelectMenuInteraction = require('../handlers/handleStringSelectMenuInteraction');
const handleModalSubmit = require('../handlers/handleModalSubmit');
const handleChannelSelectMenuInteraction = require('../handlers/handleChannelSelectMenuInteraction');
const logger = require('@utils/logger');

module.exports = function interactionCreate(client, dependencies) {

    client.on(Events.InteractionCreate, async interaction => {
        try {
            if (interaction.isChatInputCommand())
                await handleCommandInteraction(interaction, dependencies);

            if (interaction.isButton())
                await handleButtonInteraction(interaction, dependencies);

            if (interaction.isStringSelectMenu())
                await handleStringSelectMenuInteraction(interaction, dependencies);

            if (interaction.isChannelSelectMenu())
                await handleChannelSelectMenuInteraction(interaction, dependencies);

            if (interaction.isModalSubmit())
                await handleModalSubmit(interaction, dependencies);

        } catch (error) {
            logger.error('[interactionCreate] 인터랙션 처리 중 오류', {
                interactionType: interaction.type,
                userId: interaction.user?.id,
                guildId: interaction.guild?.id,
                stack: error.stack
            });
        }
    });

};