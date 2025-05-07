const getStateMessage = require('@shared/utils/stateMessage')

async function replyStateMessage(interaction, stateKey) {
    await interaction.reply({
        content: getStateMessage(stateKey),
        ephemeral: true
    });
}

module.exports = replyStateMessage;