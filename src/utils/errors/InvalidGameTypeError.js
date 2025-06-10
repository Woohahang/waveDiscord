class InvalidGameTypeError extends Error {
    constructor(gameType, userId) {
        super(`Invalid game type: "${gameType}"`);
        this.name = 'InvalidGameTypeError';
        this.gameType = gameType;
        this.userId = userId;
    }
}

module.exports = InvalidGameTypeError;