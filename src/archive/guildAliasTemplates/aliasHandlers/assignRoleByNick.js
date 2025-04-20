const { StringSelectMenuBuilder, StringSelectMenuOptionBuilder, ActionRowBuilder } = require('discord.js');
const resetMenuSelection = require('../../../shared/utils/resetMenuSelection');
const { resetState } = require('../aliasModules/state');

function createSelectMenu() {
    try {
        const select = new StringSelectMenuBuilder()
            .setCustomId('aliasTemplateSelect')
            .setMinValues(2)
            .setMaxValues(4)
            .addOptions(
                new StringSelectMenuOptionBuilder()
                    .setLabel('Nickname')
                    .setDescription('닉네임')
                    .setValue('nickName'),
                new StringSelectMenuOptionBuilder()
                    .setLabel('Age')
                    .setDescription('나이 ex) 26, 28, 96, 98 ...')
                    .setValue('age'),
                new StringSelectMenuOptionBuilder()
                    .setLabel('Gender')
                    .setDescription('성별 ex) 남, 여')
                    .setValue('gender'),
                new StringSelectMenuOptionBuilder()
                    .setLabel('Tier')
                    .setDescription('티어 ex) D, A, P, G ...')
                    .setValue('tier'),
                new StringSelectMenuOptionBuilder()
                    .setLabel('Other')
                    .setDescription('기타 항목')
                    .setValue('other')
            );

        return new ActionRowBuilder()
            .addComponents(select);
    } catch (error) {
        throw error;
    };
};

const message = (guildName) =>
    `## ${guildName} 서버, 닉네임 양식 설정\n` +
    '> * 원하는 순서로 필요한 키워드만 클릭해주세요 !\n' +
    '> * 순서가 변경이 안 되어도 안심하세요 ! 내부적으로 클릭 순서를 기록합니다. ';

// 닉네임 포함할 양식 체크핸들러 모듈을 내보내기
module.exports = async (interaction) => {
    try {
        // 상태 초기화
        resetState();

        // 선택 메뉴 초기화
        await resetMenuSelection(interaction.message);

        const guildName = interaction.guild.name;
        const row = createSelectMenu();

        await interaction.reply({
            content: message(guildName),
            components: [row],
            ephemeral: true
        });

    } catch (error) {
        console.error('aliasHandlers.js 예외 : ', error);
    };
};