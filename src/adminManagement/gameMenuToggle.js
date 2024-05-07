// gameMenuToggle.js

const { StringSelectMenuBuilder, StringSelectMenuOptionBuilder, ActionRowBuilder } = require('discord.js');
const visibilitySchema = require('../mongoDB/visibilitySchema.js');

const gameLabels = {
    steam: 'Steam',
    riotGames: 'Riot Games',
    steamBG: 'Steam Battle Grounds',
    kakaoBG: 'KaKao Battle Grounds',
    overWatchTwo: 'OVERWATCH 2'
};

const description = {
    steam: '스팀',
    riotGames: '라이엇 게임즈',
    steamBG: '스팀 배틀 그라운드',
    kakaoBG: '카카오 배틀 그라운드',
    overWatchTwo: '오버워치 2'
}

// 관리자 채널에서 메뉴 보이기 또는 메뉴 숨기기 메뉴를 클릭하면 데이터 베이스에서 숨겨진 게임 종류 또는 보이고 있는 게임 종류를 나타냄
async function gameMenuToggle(interaction, type) {
    try {

        const targetGuildId = interaction.guildId;

        let visibilityData = await visibilitySchema.findOne({ guildId: targetGuildId });

        if (!visibilityData) {
            visibilityData = new visibilitySchema({ guildId: targetGuildId });
            await visibilityData.save();
        }

        let games;
        if (type === 'showMenu') {
            games = Object.entries(visibilityData.toObject()).filter(([key, value]) => value === true).map(([key]) => key);
        } else if (type === 'hideMenu') {
            games = Object.entries(visibilityData.toObject()).filter(([key, value]) => value === false).map(([key]) => key);
        }

        // 숨길 게임이 없는 경우 사용자에게 알림
        if (games.length === 0) {
            await interaction.reply({
                content: type === 'hideMenu' ? '숨길 수 있는 메뉴가 없습니다.' : '보여줄 수 있는 메뉴가 없습니다.',
                ephemeral: true
            });
            return; // 함수 종료
        }

        // true, 또는 false 요청에 따라 DB에서 가지고 온 데이터들 SelectMenu 로 객체화
        let options = games.map(field => {
            return new StringSelectMenuOptionBuilder()
                .setLabel(gameLabels[field])
                .setDescription(`${description[field]} ${type === 'showMenu' ? '보이기' : '숨기기'}`)
                .setValue(type + field);
        });

        // 숨기기 요청 이라면 CustomId : hideMenu // 보이기 요청이라면 CustomId : showMenu
        const select = new StringSelectMenuBuilder()
            .setCustomId(`${type}Handler`)
            .setPlaceholder(`메뉴 ${type === 'showMenu' ? '보이기 !' : '숨기기 !'}`)
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
    }
}

module.exports = { gameMenuToggle };