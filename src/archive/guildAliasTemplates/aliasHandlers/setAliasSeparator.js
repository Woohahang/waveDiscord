const { StringSelectMenuBuilder, StringSelectMenuOptionBuilder, ActionRowBuilder } = require('discord.js');
const { setState } = require('../aliasModules/state');
const translatedPatterns = require('../aliasModules/translatedPatterns');

function createSelectMenu() {
    try {
        const select = new StringSelectMenuBuilder()
            .setCustomId('aliasSeparatorMenu')
            .addOptions(
                new StringSelectMenuOptionBuilder()
                    .setLabel('Space (　)')
                    .setDescription('띄어쓰기')
                    .setValue('space'),
                new StringSelectMenuOptionBuilder()
                    .setLabel('Slash ( / )')
                    .setDescription('슬래시')
                    .setValue('/'),
                new StringSelectMenuOptionBuilder()
                    .setLabel('Hyphen ( - )')
                    .setDescription('하이픈')
                    .setValue('-'),
                new StringSelectMenuOptionBuilder()
                    .setLabel('Underscore ( _ )')
                    .setDescription('언더바')
                    .setValue('_'),
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
    '> * 문단을 나누는 키워드를 선택해주세요 !\n';

/**
 * 길드 닉네임 양식 순서 안내 및 문단을 나누는 키워드 안내 함수
 * 
 * @param {Object} interaction - Discord 상호작용 객체
 * @param {Array} interaction.values - 길드 닉네임 양식 키워드들
*/

module.exports = async (interaction) => {
    try {
        // 선택 된 길드 닉네임 키워드들 상태 저장
        const aliasPatterns = interaction.values;
        setState({ aliasPatterns });

        // 현재 상태의 번역된 패턴을 가지고 옵니다.
        const patterns = translatedPatterns();

        await interaction.update({
            content: message(patterns),
            components: [createSelectMenu()],
            ephemeral: true
        });

    } catch (error) {
        console.error('setAliasSeparator.js 예외 : ', error);
    };
};