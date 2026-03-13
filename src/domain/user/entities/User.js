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
    addNickname(gameType, nickname) {
        const nicknames = this.games[gameType];

        const isDuplicate = nicknames.some(
            entry => entry.nickname === nickname
        );

        if (isDuplicate)
            return "DUPLICATE_NICKNAME";

        if (nicknames.length >= 5)
            return "MAX_NICKNAME_LIMIT";

        nicknames.push(nickname);
        this.games[gameType] = nicknames;

        return "NICKNAME_SAVE_SUCCESS";  // SAVE_NICKNAME_SUCCESS
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

    // 닉네임 중복 검사
    // 닉네임 최대 개수 검사

}

module.exports = User;