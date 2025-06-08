const { GAME_TYPES } = require("./gameTypes");

const gameProfileUrls = {
    [GAME_TYPES.LEAGUE_OF_LEGENDS]: nickname =>
        `https://www.op.gg/summoners/kr/${encodeURIComponent(nickname.replace('#', '-'))}`,

    [GAME_TYPES.TEAMFIGHT_TACTICS]: nickname =>
        `https://lolchess.gg/profile/kr/${encodeURIComponent(nickname.replace('#', '-'))}`,

    [GAME_TYPES.VALORANT]: nickname =>
        `https://valorant.op.gg/profile/${encodeURIComponent(nickname.replace('#', '-'))}`,

    [GAME_TYPES.STEAM_BATTLEGROUNDS]: nickname =>
        `https://pubg.op.gg/user/${encodeURIComponent(nickname)}`,

    [GAME_TYPES.KAKAO_BATTLEGROUNDS]: nickname =>
        `https://dak.gg/pubg/profile/kakao/${encodeURIComponent(nickname)}`,

    [GAME_TYPES.LOST_ARK]: nickname =>
        `https://iloa.gg/character/${encodeURIComponent(nickname)}`,

    [GAME_TYPES.RAINBOW_SIX]: nickname =>
        `https://r6.tracker.network/r6siege/profile/xbl/${encodeURIComponent(nickname)}/overview`,
};

module.exports = gameProfileUrls;