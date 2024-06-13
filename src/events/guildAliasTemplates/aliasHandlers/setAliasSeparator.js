// setAliasSeparator.js

const { StringSelectMenuBuilder, StringSelectMenuOptionBuilder, ActionRowBuilder } = require('discord.js');
const { getState, setState } = require('../aliasModules/state');
const separator = require('../constants/separator');

const { Space, Slash, Hyphen, Underscore } = separator;

function createSelectMenu() {
    try {
        const select = new StringSelectMenuBuilder()
            .setCustomId('aliasSeparatorMenu')
            .addOptions(
                new StringSelectMenuOptionBuilder()
                    .setLabel('Space')
                    .setDescription('띄어쓰기')
                    .setValue(Space),
                new StringSelectMenuOptionBuilder()
                    .setLabel('Slash')
                    .setDescription('슬래시 /')
                    .setValue(Slash),
                new StringSelectMenuOptionBuilder()
                    .setLabel('Hyphen')
                    .setDescription('하이픈 -')
                    .setValue(Hyphen),
                new StringSelectMenuOptionBuilder()
                    .setLabel('Underscore')
                    .setDescription('언더바 _')
                    .setValue(Underscore),
            );

        return new ActionRowBuilder()
            .addComponents(select);
    } catch (error) {
        throw error;
    };
};

const message = (guildAlias) =>
    `## 📝 ${guildAlias}\n` +
    '> * 순서가 맞다면 진행해주세요 !\n' +
    '> * 양식 사이 사이 문단을 나누는 키워드를 선택해주세요 !\n';


// 길드 별명 양식 설정에서 문단을 나누는 키워드 설정하기
module.exports = async (interaction) => {
    try {
        const selectedValues = interaction.values;
        setState({ aliasTemplate: selectedValues });


        const guildAlias = selectedValues.join(', ');



        const row = createSelectMenu();

        await interaction.update({
            content: message(guildAlias),
            components: [row],
            ephemeral: true
        });

    } catch (error) {
        console.error('setAliasSeparator.js 예외 : ', error);
    };
};