const isBotAdmin = require('@utils/discord/isBotAdmin');
const { Events } = require('discord.js');
const handleButtonInteraction = require('@handlers/interactions/handleButtonInteraction');
const handleChatInputCommand = require('@handlers/interactions/handleChatInputCommand');
const handleStringSelectMenu = require('@handlers/interactions/handleStringSelectMenu');
const handleSubmitModal = require('@handlers/interactions/handleSubmitModal');

module.exports = {
    name: Events.InteractionCreate,
    once: false,
    async execute(interaction) {
        if (!interaction.guild || !isBotAdmin(interaction.guild)) return;

        if (interaction.isButton()) await handleButtonInteraction(interaction);
        else if (interaction.isModalSubmit()) await handleSubmitModal(interaction);
        else if (interaction.isStringSelectMenu()) await handleStringSelectMenu(interaction);
        else if (interaction.isChatInputCommand()) await handleChatInputCommand(interaction);
    }
}