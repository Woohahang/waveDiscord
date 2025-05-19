async function handleChatInputCommand(interaction) {
    const command = interaction.client.commands.get(interaction.commandName);
    if (!command) { return console.log('commandName 을 찾을 수 없습니다.') };

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        if (interaction.replied || interaction.deferred) {
            await interaction.followUp({ content: '이 명령을 실행하는 동안 오류가 발생했습니다!', ephemeral: true });
        } else {
            await interaction.reply({ content: '이 명령을 실행하는 동안 오류가 발생했습니다!', ephemeral: true });
        };
    };
};

module.exports = handleChatInputCommand;