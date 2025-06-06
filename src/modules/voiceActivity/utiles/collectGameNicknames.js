/**
 * 유저의 게임별 닉네임 정보를 { gameType, nickname } 형식으로 수집
 * @param {UserData} userData
 * @param {string[]} gameTypes
 * @returns {{ gameType: string, nickname: string }[]}
 */
function collectGameNicknames(userData, gameTypes) {
    return gameTypes.flatMap(gameType => {
        const nicknames = userData.getNicknameList(gameType);
        return nicknames.map(nickname => ({ gameType, nickname }));
    });
}

module.exports = collectGameNicknames;