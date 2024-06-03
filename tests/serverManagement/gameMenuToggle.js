// gameMenuToggle.js

const { StringSelectMenuBuilder, StringSelectMenuOptionBuilder, ActionRowBuilder } = require('discord.js');
const { menuSelectionResetter } = require('../../module/common/menuSelectionResetter');

const GuildSettings = require('../../services/GuildSettings');

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

// 관리자 채널에서 메뉴 보이기 또는 메뉴 숨기기 메뉴를 클릭하면 데이터 베이스에서 숨겨진 게임 종류 또는 보이고 있는 게임 종류를 나타냄
async function gameMenuToggle(interaction, type) {
    try {
        // 관리자 메뉴 초기화 ex) 메뉴 보이기 창에서 선택하세요! 로 바뀜
        menuSelectionResetter(interaction);

        // 길드 인스턴스 생성
        const guildSettings = new GuildSettings(interaction.guild.id);

        // 길드 데이터
        const guildData = await guildSettings.loadOrCreate();

        let games;
        if (type === 'showMenu') {
            games = Object.entries(guildData.toObject()).filter(([key, value]) => value === false).map(([key]) => key);
        } else if (type === 'hideMenu') {
            games = Object.entries(guildData.toObject()).filter(([key, value]) => value === true).map(([key]) => key);
        };

        // 숨길 게임이 없는 경우 사용자에게 알림
        if (games.length === 0) {
            await interaction.reply({
                content: type === 'showMenu' ? '모든 메뉴가 표기된 상태입니다.' : '숨길 수 있는 메뉴가 없습니다.',
                ephemeral: true
            });
            return; // 함수 종료
        };

        // true, 또는 false 요청에 따라 DB에서 가지고 온 데이터들 SelectMenu 로 객체화
        let options = games.map(field => {
            return new StringSelectMenuOptionBuilder()
                .setLabel(gameLabels[field])
                .setDescription(`${description[field]} ${type === 'hideMenu' ? '숨기기' : '보이기'}`)
                .setValue(type + field);
        });

        // 숨기기 요청 이라면 CustomId : hideMenu // 보이기 요청이라면 CustomId : showMenu
        const select = new StringSelectMenuBuilder()
            .setCustomId(`${type}Handler`)
            .setPlaceholder(`메뉴 ${type === 'hideMenu' ? '숨기기 !' : '보이기 !'}`)
            .setMinValues(1)
            .setMaxValues(options.length)
            .addOptions(options);

        const row = new ActionRowBuilder()
            .addComponents(select);

        await interaction.reply({
            components: [row],
            ephemeral: true
        });

    } catch (error) {
        console.error(`관리자 채널 ${type}Menu.js 에서 에러 발생 : `, error);
        await interaction.reply({
            content: '오류가 발생했습니다. 다시 시도해주세요.',
            ephemeral: true
        });
    };
};

module.exports = { gameMenuToggle };