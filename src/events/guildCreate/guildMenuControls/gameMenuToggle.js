// gameMenuToggle.js

const { StringSelectMenuBuilder, StringSelectMenuOptionBuilder, ActionRowBuilder } = require('discord.js');
const GuildSettings = require('../../../services/GuildSettings');
const { menuSelectionResetter } = require('../../../module/common/menuSelectionResetter');

const gameLabels = {
    steam: 'Steam',
    loL: 'League of Legends',
    tfT: 'Teamfight Tactics',
    valorant: 'Valorant',
    steamBG: 'Steam Battle Grounds',
    kakaoBG: 'KaKao Battle Grounds',
    blizzard: 'Blizzard',
    overWatchTwo: 'OVERWATCH 2'
};

const description = {
    steam: '스팀',
    loL: '리그 오브 레전드',
    tfT: '롤토체스',
    valorant: '발로란트',
    steamBG: '스팀 배틀 그라운드',
    kakaoBG: '카카오 배틀 그라운드',
    blizzard: '블리자드',
    overWatchTwo: '오버워치 2'
};

// guildData 객체에서 condition과 일치하는 값을 가진 항목만 필터링하는 함수
function filterOptions(guildData, condition) {

    // 객체를 가져옵니다.
    const obj = guildData.toObject();

    // 객체의 모든 키를 배열로 가져옵니다.
    const keys = Object.keys(obj);

    // 조건과 일치하는 값을 가진 키들만 필터링합니다.
    return keys.filter(key => obj[key] === condition);

};

// 메뉴 선택을 위한 ActionRowBuilder 구성 함수
function buildMenuActionRow(options, value) {
    const select = new StringSelectMenuBuilder()
        .setCustomId(value)
        .setPlaceholder('메뉴' + (value === 'showMenu' ? ' 보이기 !' : ' 숨기기 !'))
        .setMinValues(1)
        .setMaxValues(options.length)
        .addOptions(
            options.map(field => (
                new StringSelectMenuOptionBuilder()
                    .setLabel(gameLabels[field])
                    .setDescription(description[field] + (value === 'showMenu' ? ' 보이기 !' : ' 숨기기 !'))
                    .setValue(field)
            ))
        );

    const row = new ActionRowBuilder()
        .addComponents(select);

    return row;
}

// 용도, 관리자 채널에서 메뉴 숨기기 또는 보이기에 해당하는 메뉴를 출력
module.exports = async (interaction) => {

    // 메뉴 초기화
    menuSelectionResetter(interaction);

    let options = [];
    const value = interaction.values[0];

    // 길드 인스턴스 생성 -> 불러오기
    const guildSettings = new GuildSettings(interaction.guild.id);
    const guildData = await guildSettings.loadOrCreate();

    try {
        switch (value) {
            case 'showMenu':
                options = filterOptions(guildData, false);
                break;

            case 'hideMenu':
                options = filterOptions(guildData, true);
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