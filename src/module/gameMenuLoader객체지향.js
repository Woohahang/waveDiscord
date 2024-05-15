const { ActionRowBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder } = require('discord.js');
const guildSettingsSchema = require('../mongoDB/guildSettingsSchema.js');

class GameMenuLoader {
    constructor(guildId) {
        this.guildId = guildId;
    }

    async load() {
        try {
            let guildSettingsData = await this.fetchGuildSettings();

            const allGames = this.getAllGames(guildSettingsData);
            let gameMenuSelect = this.createGameMenuSelect();

            let visibleGames = this.getVisibleGames(allGames);
            visibleGames.forEach(game => {
                gameMenuSelect.addOptions(this.createGameOption(game));
            });

            let row = new ActionRowBuilder().addComponents(gameMenuSelect);

            return row;
        } catch (error) {
            console.error(error);
        }
    }

    async fetchGuildSettings() {
        let guildSettingsData = await guildSettingsSchema.findOne({ guildId: this.guildId });

        if (!guildSettingsData) {
            guildSettingsData = new guildSettingsSchema({ guildId: this.guildId });
            await guildSettingsData.save();
        }
        return guildSettingsData;
    }

    getAllGames(guildSettingsData) {
        return [
            { label: 'Steam', description: '스팀 친구 코드 또는 스팀 프로필 주소', value: 'steam', visible: guildSettingsData.steam },
            { label: 'League of Legends', description: '리그 오브 레전드', value: 'loL', visible: guildSettingsData.loL },
            { label: 'Teamfight Tactics', description: '롤토체스 닉네임', value: 'tfT', visible: guildSettingsData.tfT },
            { label: 'Steam Battle Grounds', description: '스팀 배틀 그라운드', value: 'steamBG', visible: guildSettingsData.steamBG },
            { label: 'KaKao Battle Grounds', description: '카카오 배틀 그라운드', value: 'kaKaoBG', visible: guildSettingsData.kakaoBG },
            { label: 'OVERWATCH 2', description: '오버워치 2', value: 'overWatchTwo', visible: guildSettingsData.overWatchTwo },
        ];
    }

    createGameMenuSelect() {
        return new StringSelectMenuBuilder()
            .setCustomId('gameMenu')
            .setPlaceholder('닉네임 등록 !');
    }

    getVisibleGames(allGames) {
        return allGames.filter(games => games.visible);
    }

    createGameOption(game) {
        return new StringSelectMenuOptionBuilder()
            .setLabel(game.label)
            .setDescription(game.description)
            .setValue(game.value);
    }
}

module.exports = { GameMenuLoader };

