function createNicknameEntry({ gameType, input, externalData }) {
    if (gameType === "leagueOfLegends")
        return {
            nickname: input,
            tier: null,
            rank: null,
            leaguePoints: null,
        }

    if (gameType === "steam")
        return {
            nickname: externalData.nickname,
            profileLink: input,
        }

    else
        return input;
}

module.exports = createNicknameEntry;