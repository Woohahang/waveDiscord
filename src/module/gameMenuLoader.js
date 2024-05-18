const { ActionRowBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder } = require('discord.js');
const GuildSettings = require('../services/GuildSettings');

function getVisibleGames(allGames) {
    return allGames.filter(games => games.visible);
}

function createGameOption(game) {
    return new StringSelectMenuOptionBuilder()
        .setLabel(game.label)
        .setDescription(game.description)
        .setValue(game.value);
};


module.exports = async (guildId) => {
    try {
        const guildData = new GuildSettings(guildId);
        const guildSettingsData = await guildData.loadOrCreate();

        // 각 게임의 가시성 설정을 확인하고, true 설정된 게임만 메뉴에 추가
        const allGames = [
            { label: 'Steam', description: '스팀 친구 코드 또는 스팀 프로필 주소', value: 'steam', visible: guildSettingsData.steam },
            { label: 'League of Legends', description: '리그 오브 레전드', value: 'loL', visible: guildSettingsData.loL },
            { label: 'Teamfight Tactics', description: '롤토체스 닉네임', value: 'tfT', visible: guildSettingsData.tfT },
            { label: 'Steam Battle Grounds', description: '스팀 배틀 그라운드', value: 'steamBG', visible: guildSettingsData.steamBG },
            { label: 'KaKao Battle Grounds', description: '카카오 배틀 그라운드', value: 'kaKaoBG', visible: guildSettingsData.kakaoBG },
            { label: 'OVERWATCH 2', description: '오버워치 2', value: 'overWatchTwo', visible: guildSettingsData.overWatchTwo },
        ];

        let gameMenuSelect = new StringSelectMenuBuilder()
            .setCustomId('gameMenu')
            .setPlaceholder('닉네임 등록 !');

        // 각 열마다 가시성이 true 인지 false 인지 배열 식으로 순서대로 가지고 온다.
        let visibleGames = getVisibleGames(allGames);

        if (visibleGames.length === 0) {
            gameMenuSelect.addOptions(
                new StringSelectMenuOptionBuilder()
                    .setLabel('등록 가능한 메뉴 없음')
                    .setDescription('관리자에 의해 모든 메뉴 숨김 상태.')
                    .setValue('noOptions')
            );
        } else {
            visibleGames.forEach(game => {
                gameMenuSelect.addOptions(createGameOption(game));
            });
        }


        let row = new ActionRowBuilder().addComponents(gameMenuSelect);

        return row;

    } catch (error) {
        console.error(error);
    };
};