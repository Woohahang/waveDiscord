const { ActionRowBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder } = require('discord.js');
const guildSettingsSchema = require('../mongoDB/guildSettingsSchema.js');

async function gameMenuLoader(guildId) {
    try {
        let guildSettingsData = await guildSettingsSchema.findOne({ guildId: guildId });

        if (!guildSettingsData) {
            guildSettingsData = new guildSettingsSchema({ guildId: guildId });
            await guildSettingsData.save();
        }

        // 각 게임의 가시성 설정을 확인하고, true 설정된 게임만 메뉴에 추가
        const allGames = [
            { label: 'Steam', description: '스팀 친구 코드 또는 스팀 프로필 주소', value: 'steam', visible: guildSettingsData.steam },
            { label: 'Riot Games', description: '라이엇 게임즈 닉네임', value: 'riotGames', visible: guildSettingsData.riotGames },
            { label: 'Steam Battle Grounds', description: '스팀 배틀 그라운드 닉네임', value: 'steamBG', visible: guildSettingsData.steamBG },
            { label: 'KaKao Battle Grounds', description: '카카오 배틀 그라운드 닉네임', value: 'kaKaoBG', visible: guildSettingsData.kakaoBG },
            { label: 'OVERWATCH 2', description: '오버워치 2', value: 'overWatchTwo', visible: guildSettingsData.overWatchTwo },
        ];

        let gameMenuSelect = new StringSelectMenuBuilder()
            .setCustomId('gameMenu')
            .setPlaceholder('닉네임 등록 !');

        // 각 열마다 가시성이 true 인지 false 인지 배열 식으로 순서대로 가지고 온다.
        let visibleGames = getVisibleGames(allGames);

        // 가시성이 true 인 것만 옵션에 추가한다.
        visibleGames.forEach(game => {
            gameMenuSelect.addOptions(createGameOption(game));
        });

        let row = new ActionRowBuilder().addComponents(gameMenuSelect);

        return row;

    } catch (error) {
        console.error(error);
    }
}

module.exports = { gameMenuLoader };


function getVisibleGames(allGames) {
    return allGames.filter(games => games.visible);
}

function createGameOption(game) {
    return new StringSelectMenuOptionBuilder()
        .setLabel(game.label)
        .setDescription(game.description)
        .setValue(game.value);
}