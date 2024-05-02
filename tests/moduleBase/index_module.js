let originalMessageId;

const { StringSelectMenuBuilder, StringSelectMenuOptionBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');

const { Client, Collection, Events, GatewayIntentBits, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require('discord.js');
const { testtoken } = require('../../config.json');
const connectToDatabase = require('./database.js');
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildMembers,
    ]
});



// 메뉴 초기화 테스트
client.on('messageCreate', async message => {
    const channel = message.channel;
    if (message.member.id === '282793473462239232' && message.content === "1") {
        const select = new StringSelectMenuBuilder()
            .setCustomId('starter')
            .setPlaceholder('선택하세요!')
            .addOptions(
                new StringSelectMenuOptionBuilder()
                    .setLabel('Bulbasaur')
                    .setDescription('The dual-type Grass/Poison Seed Pokémon.')
                    .setValue('bulbasaur'),
                new StringSelectMenuOptionBuilder()
                    .setLabel('Charmander')
                    .setDescription('The Fire-type Lizard Pokémon.')
                    .setValue('charmander'),
                new StringSelectMenuOptionBuilder()
                    .setLabel('Squirtle')
                    .setDescription('The Water-type Tiny Turtle Pokémon.')
                    .setValue('squirtle'),
            );

        const row = new ActionRowBuilder()
            .addComponents(select);

        const sentMessage = await channel.send({
            components: [row],
        });
        originalMessageId = sentMessage;
    }
});

client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.customId.startsWith('starter')) return;

    const modal = new ModalBuilder()
        .setCustomId('myModalddd')
        .setTitle('My Modal');

    const favoriteColorInput = new TextInputBuilder()
        .setCustomId('favoriteColorInput')
        // The label is the prompt the user sees for this input
        .setLabel("What's your favorite color?")
        // Short means only a single line of text
        .setStyle(TextInputStyle.Short);

    const box = new ActionRowBuilder().addComponents(favoriteColorInput);

    modal.addComponents(box);

    await interaction.showModal(modal);

});

client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isModalSubmit()) return;
    if (interaction.customId === 'myModalddd') {


        await interaction.reply({
            content: '제출 성공',
            ephemeral: true,
        });
        // 이전에 보낸 메시지를 수정하여 갱신된 선택 메뉴 표시

        await originalMessageId.edit({
            components: [originalMessageId.components[0]],
        });

    }
});