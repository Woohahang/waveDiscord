const { StringSelectMenuBuilder, StringSelectMenuOptionBuilder, ActionRowBuilder } = require('discord.js');
const { setState } = require('../aliasModules/state');

function createSelectMenu() {
    try {
        const select = new StringSelectMenuBuilder()
            .setCustomId('aliasSeparatorMenu')
            .addOptions(
                new StringSelectMenuOptionBuilder()
                    .setLabel('Space')
                    .setDescription('띄어쓰기')
                    .setValue('space'),
                new StringSelectMenuOptionBuilder()
                    .setLabel('Slash')
                    .setDescription('슬래시 /')
                    .setValue('slash'),
                new StringSelectMenuOptionBuilder()
                    .setLabel('Hyphen')
                    .setDescription('하이픈 -')
                    .setValue('hyphen'),
                new StringSelectMenuOptionBuilder()
                    .setLabel('Underscore')
                    .setDescription('언더바 _')
                    .setValue('underscore'),
            );

        return new ActionRowBuilder()
            .addComponents(select);
    } catch (error) {
        throw error;
    };
};

// 선택된 값과 한글 메시지를 매칭하는 객체
const valueToKoreanMap = {
    nickName: '닉네임',
    age: '나이',
    gender: '성별',
    tier: '티어'
};

// 선택된 값에 따라 한글 변환
const generateKoreanMessage = (selectedValues) => {
    return selectedValues.map(value => valueToKoreanMap[value] || value).join(', ');
};

const message = (guildAlias) =>
    `## 📝 ${guildAlias}\n` +
    '> * 순서가 맞다면 진행해주세요 !\n' +
    '> * 문단을 나누는 키워드를 선택해주세요 !\n';

/**
 * 길드 닉네임 양식 순서 안내 및 문단을 나누는 키워드 안내 함수
 * 
 * @param {Object} interaction - Discord 상호작용 객체
 * @param {Array} interaction.values - 길드 닉네임 양식 키워드들
*/

module.exports = async (interaction) => {
    try {
        const selectedValues = interaction.values;

        // 키워드들 상태저장
        setState({ aliasTemplate: selectedValues });

        // 선택된 값에 따라 한글 변환
        const koreanMessage = generateKoreanMessage(selectedValues);

        await interaction.update({
            content: message(koreanMessage),
            components: [createSelectMenu()],
            ephemeral: true
        });

    } catch (error) {
        console.error('setAliasSeparator.js 예외 : ', error);
    };
};