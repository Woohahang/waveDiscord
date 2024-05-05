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

module.exports = async (interaction) => {
    try {
        const targetGuildId = interaction.guildId;

        // 길드 데이터를 찾거나 만듭니다.
        let visibilityData = await visibilitySchema.findOne({ guildId: targetGuildId });

        if (!visibilityData) {
            visibilityData = new visibilitySchema({ guildId: targetGuildId });
            await visibilityData.save();
        }

        // 길드 데이터의 false 게임만 가지고 옵니다.
        let falseGames = Object.entries(visibilityData.toObject()).filter(([key, value]) => value === false).map(([key, value]) => key);

        // 가지고 온 게임을 옵션에 추가합니다.
        let options = falseGames.map(field => {
            return new StringSelectMenuOptionBuilder()
                .setLabel(gameLabels[field])
                .setDescription(`${description[field]} 숨기기`)
                .setValue('hide' + field);
        });

        // 셀렉트 메뉴에 옵션을 넣습니다.
        const select = new StringSelectMenuBuilder()
            .setCustomId('starter')
            .setPlaceholder('메뉴 숨기기 !')
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
        console.error('관리자 채널 hideMenu.js 에서 에러 발생 : ', error);
        await interaction.reply({
            content: '오류가 발생했습니다. 다시 시도해주세요.',
            ephemeral: true
        });
    }
};