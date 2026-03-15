const { Events } = require('discord.js');
const logger = require('@utils/logger');
const buttonHandler = require('../handlers/buttonHandler');
const commandHandler = require('../handlers/commandHandler');
const modalSubmitHandler = require('../handlers/modalSubmitHandler');
const selectMenuHandler = require('../handlers/selectMenuHandler');

module.exports = (client, dependencies) => {

    client.on(Events.InteractionCreate, async interaction => {
        try {
            if (interaction.isChatInputCommand())
                await commandHandler(interaction, dependencies);

            if (interaction.isButton())
                await buttonHandler(interaction, dependencies);

            if (interaction.isStringSelectMenu())
                await selectMenuHandler(interaction, dependencies);

            if (interaction.isModalSubmit())
                await modalSubmitHandler(interaction, dependencies);
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