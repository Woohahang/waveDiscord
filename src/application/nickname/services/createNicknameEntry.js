const GAME_TYPES = require('@constants/gameTypes');
const { randomUUID } = require('node:crypto');

function createNicknameEntry({ gameType, input, externalData }) {
    if (gameType === GAME_TYPES.LEAGUE_OF_LEGENDS)
        return {
            entryId: randomUUID(),
            nickname: input,
            tier: null,
            rank: null,
            leaguePoints: null,
        }

    if (gameType === GAME_TYPES.STEAM)
        return {
            entryId: randomUUID(),
            nickname: externalData.nickname,
            profileLink: input,
        }

    return {
        entryId: randomUUID(),
        nickname: input,
    };
}

module.exports = createNicknameEntry;