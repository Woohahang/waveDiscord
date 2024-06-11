// createFields.js

const filterOptions = require('../../../../module/data/filterOptions');
const getGamesLink = require('./getGamesLink');


function createFields(userData, guildData, waveEmojis) {
    try {
        let fields = [];
        let riotGames = '';
        let BattleGroundGames = '';
        let blizzardGames = '';

        const trueValueGames = filterOptions(guildData, true);
        trueValueGames.forEach(gameType => {

            switch (gameType) {
                case 'steam':
                    if (userData[gameType].length > 0) {
                        const { playerName, profileLink } = userData[gameType][0];
                        const gameTypeEmoji = waveEmojis.get('wave_' + gameType);

                        fields.push({ name: 'Steam', value: `<:wave_${gameType}:${gameTypeEmoji}> [${playerName}](${profileLink})` });
                    };
                    break;

                case 'leagueOfLegends':
                case 'teamfightTactics':
                case 'valorant':
                    if (userData[gameType].length > 0) {
                        userData[gameType].forEach(nickName => {
                            const gameTypeEmoji = waveEmojis.get('wave_' + gameType);

                            riotGames += `<:wave_${gameType}:${gameTypeEmoji}> [${nickName}](${getGamesLink(gameType, nickName)})\n`;
                        });
                    };
                    break;

                case 'steamBattleGround':
                case 'kakaoBattleGround':
                    if (userData[gameType].length > 0) {
                        userData[gameType].forEach(nickName => {
                            const gameTypeEmoji = waveEmojis.get('wave_' + gameType);

                            BattleGroundGames += `<:wave_${gameType}:${gameTypeEmoji}> [${nickName}](${getGamesLink(gameType, nickName)})\n`;
                        });
                    };
                    break;

                case 'blizzard':
                case 'overWatchTwo':
                    if (userData[gameType].length > 0) {
                        userData[gameType].forEach(nickName => {
                            const gameTypeEmoji = waveEmojis.get('wave_' + gameType);

                            blizzardGames += `<:wave_${gameType}:${gameTypeEmoji}> ${nickName}\n`;
                        });
                    }
                    break;

            };
        });

        if (riotGames && guildData.leagueOfLegends || riotGames && guildData.teamfightTactics || riotGames && guildData.valorant) {
            fields.push({ name: 'Riot Games', value: riotGames });
        };

        if (BattleGroundGames && guildData.steamBattleGround || BattleGroundGames && guildData.kakaoBattleGround) {
            fields.push({ name: 'Battle Ground', value: BattleGroundGames });
        };

        if (blizzardGames && guildData.blizzard || blizzardGames && guildData.overWatchTwo) {
            fields.push({ name: 'Blizzard', value: blizzardGames });
        };

        return fields;

    } catch (error) {
        throw error;
    };
};

module.exports = createFields;