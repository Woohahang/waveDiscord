const { Events } = require('discord.js');
const handleCommandInteraction = require('../handlers/handleCommandInteraction');
const handleButtonInteraction = require('../handlers/handleButtonInteraction');
const handleSelectMenuInteraction = require('../handlers/handleSelectMenuInteraction');
const handleModalSubmit = require('../handlers/handleModalSubmit');
const logger = require('@utils/logger');

module.exports = function interactionCreate(client, dependencies) {

    client.on(Events.InteractionCreate, async interaction => {
        try {
            if (interaction.isChatInputCommand())
                await handleCommandInteraction(interaction, dependencies);

            if (interaction.isButton())
                await handleButtonInteraction(interaction, dependencies);

            if (interaction.isStringSelectMenu())
                await handleSelectMenuInteraction(interaction, dependencies);

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