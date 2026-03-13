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

    /**
     * 게임 닉네임들을 삭제합니다.
     * 
    */
    removeNicknames(nicknamesToRemove) {
        let removedCount = 0;

        for (const { gameType, nickname } of nicknamesToRemove) {
            const removed = this.removeNickname(gameType, nickname);

            if (removed) {
                removedCount += 1;
            }
        }

        if (removedCount === 0) return "REMOVE_NOT_FOUND";
        if (removedCount !== nicknamesToRemove.length) return "REMOVE_PARTIAL_SUCCESS";
        return "REMOVE_SUCCESS";
    }

    removeNickname(gameType, nickname) {
        this.games[gameType] =
            this.games[gameType].filter(n => n !== nickname)
    }

}

module.exports = User;