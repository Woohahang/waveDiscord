// aliasHandlers.js

const { StringSelectMenuBuilder, StringSelectMenuOptionBuilder, ActionRowBuilder } = require('discord.js');
const resetMenuSelection = require('../../../module/common/resetMenuSelection');
const guildAlias = require('../constants/guildAlias');

const { Age, NickName, Gender, Tier } = guildAlias;

function createSelectMenu() {
    try {
        const select = new StringSelectMenuBuilder()
            .setCustomId('aliasTemplateSelect')
            .setMinValues(1)
            .setMaxValues(4)
            .addOptions(
                new StringSelectMenuOptionBuilder()
                    .setLabel('Nickname')
                    .setDescription('닉네임')
                    .setValue(NickName),
                new StringSelectMenuOptionBuilder()
                    .setLabel('Age')
                    .setDescription('나이')
                    .setValue(Age),
                new StringSelectMenuOptionBuilder()
                    .setLabel('Gender')
                    .setDescription('성별')
                    .setValue(Gender),
                new StringSelectMenuOptionBuilder()
                    .setLabel('Tier')
                    .setDescription('티어')
                    .setValue(Tier),
            );

        return new ActionRowBuilder()
            .addComponents(select);
    } catch (error) {
        throw error;
    };
};

// const createMessage = (guildName) => {
//     return `🎨 **${guildName} 서버 별명 양식**\n\n` +
//         `🔹 **주의사항**\n` +
//         `> - 순서가 안 바뀌어도 안심하세요!\n` +
//         `> - 내부적으로 클릭 순서를 기록합니다.\n\n` +
//         `📋 **사용 방법**\n` +
//         `> - 원하는 양식만 순서대로 선택해주세요!`;
// };

const message = (guildName) =>
    `## ${guildName} 서버, 닉네임 양식 설정\n` +
    '> * 내부적으로 클릭 순서를 기록합니다.\n' +
    '> * 원하는 키워드만 원하는 순서로 클릭해주세요.' +
    '기술적 한계로 아래 메뉴에서 순서가 즉각 변경 되지 않습니다.';


// 닉네임 포함할 양식 체크핸들러 모듈을 내보내기
module.exports = async (interaction) => {
    try {
        // 선택 메뉴 초기화
        await resetMenuSelection(interaction);

        const guildName = interaction.guild.name;
        const row = createSelectMenu();
        // const message = createMessage(guildName);

        await interaction.reply({
            content: message(guildName),
            components: [row],
            ephemeral: true
        });

    } catch (error) {
        console.error('aliasHandlers.js 예외 : ', error);
    };
};
