const GameProfileGateway = require('@application/nickname/ports/gameProfileGateway');
const { GAME_TYPES } = require("@constants/gameTypes");
const fetchSteamPlayerName = require('./steam/fetchSteamPlayerName');
// const fetchRiotProfile = require('./riot/fetchRiotProfile');

class GameProfileGatewayImpl extends GameProfileGateway {
    async fetch(gameType, userInput) {

        switch (gameType) {
            case GAME_TYPES.STEAM: {
                const steamName = await fetchSteamPlayerName(userInput);
                return { nickname: steamName };
            }

            // case GAME_TYPES.LEAGUE_OF_LEGENDS:
            //     return await fetchRiotProfile(userInput);

            default:
                return null;
        }
    }
}

module.exports = GameProfileGatewayImpl;