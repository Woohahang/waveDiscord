class User {

    constructor({ userId, games = {} }) {
        this.userId = userId
        this.games = games
    }

    /**
     * 게임 닉네임을 저장합니다.
     *
     * @param {string} gameType
     * @param {string} nickname
    */
    setNickname(gameType, nickname) {
        if (!gameType) {
            throw new Error("[User.setNickname] gameType is required");
        }

        if (!nickname) {
            throw new Error("[User.setNickname] nickname is required");
        }

        this.games[gameType].push(
            nickname,
        );
    }

    removeNickname(gameType, nickname) {
        this.games[gameType] =
            this.games[gameType].filter(n => n !== nickname)
    }

}

module.exports = User;