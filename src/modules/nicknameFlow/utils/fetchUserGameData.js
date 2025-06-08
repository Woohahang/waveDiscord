const { GAME_TYPES } = require("@constants/gameTypes");
const fetchLeagueTier = require("@shared/api/fetchLeagueOfLegendsTier");
const fetchSteamPlayerName = require("@shared/api/fetchSteamPlayerName");

/**
 * 게임 종류에 따라 사용자 정보를 가져옴
 * - 스팀은 프로필 정보를 API로 가져옴
 * - 라이엇 등은 그대로 반환
 */
async function fetchUserGameData(gameType, formattedNickname) {
    if (GAME_TYPES.STEAM === gameType)
        return await fetchSteamPlayerName(formattedNickname);

    if (GAME_TYPES.LEAGUE_OF_LEGENDS === gameType)
        return await fetchLeagueTier(formattedNickname);

    return formattedNickname;
}

module.exports = fetchUserGameData;