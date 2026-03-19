class GameProfileGateway {
    async fetch(gameType, userInput) {
        throw new Error('GameProfileGateway.fetch must be implemented');
    }
}

module.exports = GameProfileGateway;