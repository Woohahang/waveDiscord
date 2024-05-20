// testbutton.js

const { ButtonBuilder, ButtonStyle, ActionRowBuilder, SlashCommandBuilder } = require('discord.js');


module.exports = {

    data: new SlashCommandBuilder()
        .setName("테스트버튼")
        .setDescription("테스트를 위한 버튼 생성"),

    async execute(interaction) {

        const button1 = new ButtonBuilder()
            .setCustomId('test1')
            .setLabel('셋팅1111')
            .setStyle(ButtonStyle.Secondary);

        const button2 = new ButtonBuilder()
            .setCustomId('test2')
            .setLabel('셋팅22222')
            .setStyle(ButtonStyle.Secondary);

        const button3 = new ButtonBuilder()
            .setCustomId('test3')
            .setLabel('셋팅한거 얻기')
            .setStyle(ButtonStyle.Secondary);


        const row = new ActionRowBuilder()
            .addComponents(button1, button2, button3);


        await interaction.reply({
            content: '테스트 버튼',
            components: [row],
            ephemeral: true
        });
    }
};