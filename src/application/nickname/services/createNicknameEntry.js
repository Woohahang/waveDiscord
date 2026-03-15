function createNicknameEntry(gameType, userInput) {
    if (gameType === "leagueOfLegends")
        return {
            nickname: userInput,
            tier: null,
            rank: null,
            leaguePoints: null,
        }

    if (gameType === "steam")
        return {
            nickname: userGameData?.nickname ?? null,
            profileLink: userInput,
        }

    else
        return userInput;
}

module.exports = createNicknameEntry;