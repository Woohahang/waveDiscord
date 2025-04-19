const { StringSelectMenuBuilder, StringSelectMenuOptionBuilder, ActionRowBuilder } = require('discord.js');
const GuildSettings = require('../../../services/GuildSettings');
const isAdmin = require('../../../shared/utils/isAdmin');
const { gameLabels, description } = require('../../../module/games/gameData');
const filterKeysByValue = require('../../../shared/utils/filterKeysByValue');
const resetMenuSelection = require('../../../shared/utils/resetMenuSelection');

// 메뉴 선택을 위한 ActionRowBuilder 구성 함수
function buildMenuActionRow(options, value) {
    const select = new StringSelectMenuBuilder()
        .setCustomId(value)
        .setPlaceholder(value === 'showMenu' ? ' 추가하기 !' : ' 삭제하기 !')
        .setMinValues(1)
        .setMaxValues(options.length)
        .addOptions(
            options.map(field => (
                new StringSelectMenuOptionBuilder()
                    .setLabel(gameLabels[field])
                    .setDescription(description[field] + (value === 'showMenu' ? ' 추가하기 !' : ' 삭제하기 !'))
                    .setValue(field)
            ))
        );

    const row = new ActionRowBuilder()
        .addComponents(select);

    return row;
};

/* 관리자 채널에서 메뉴 숨기기 또는 보이기에 해당하는 메뉴를 출력 */
module.exports = async (interaction) => {
    try {
        // 메뉴 초기화
        await resetMenuSelection(interaction.message);

        // 사용자 권한 체크
        if (!isAdmin(interaction.member)) {
            await interaction.reply({ content: '관리자 메뉴에 접근할 권한이 없습니다.', ephemeral: true });
            return;
        };

        let options = [];
        const value = interaction.values[0];

        // 길드 인스턴스 생성 -> 불러오기
        const guildSettings = new GuildSettings(interaction.guild.id);
        const guildData = await guildSettings.loadOrCreate();

        switch (value) {
            case 'showMenu':
                options = filterKeysByValue(guildData, false);
                break;

            case 'hideMenu':
                options = filterKeysByValue(guildData, true);
                break;

            default:
                console.log('gameMenuToggle.js 에서 의도 하지 않은 value : ', value);
        };

        if (options.length === 0) {
            await interaction.reply({
                content: value === 'showMenu' ? '모든 메뉴가 표기된 상태입니다.' : '숨길 수 있는 메뉴가 없습니다.',
                ephemeral: true
            });
            return;
        };

        // gameLabels 순서에 맞게 options 정렬
        options = Object.keys(gameLabels).filter(label => options.includes(label));


        // 메뉴 구성
        const row = buildMenuActionRow(options, value);

        // 메뉴 전송
        await interaction.reply({
            components: [row],
            ephemeral: true
        });

    } catch (error) {
        console.error('gameMenuToggle.js 에러 : ', error);
    };
};