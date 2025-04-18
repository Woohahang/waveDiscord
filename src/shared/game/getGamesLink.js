const gameProfileUrls = require('../../constants/gameProfileUrls');

function getGamesLink(game, nickname) {
    try {
        const generator = gameProfileUrls[game];
        return generator ? generator(nickname) : '#';
    } catch (error) {
        throw error;
    }
}

module.exports = getGamesLink;