const gameProfileUrls = {
    leagueOfLegends: nickname =>
        `https://www.op.gg/summoners/kr/${encodeURIComponent(nickname.replace('#', '-'))}`,

    teamfightTactics: nickname =>
        `https://lolchess.gg/profile/kr/${encodeURIComponent(nickname.replace('#', '-'))}`,

    valorant: nickname =>
        `https://valorant.op.gg/profile/${encodeURIComponent(nickname.replace('#', '-'))}`,

    steamBattleGround: nickname =>
        `https://pubg.op.gg/user/${encodeURIComponent(nickname)}`,

    kakaoBattleGround: nickname =>
        `https://dak.gg/pubg/profile/kakao/${encodeURIComponent(nickname)}`,

    lostArk: nickname =>
        `https://iloa.gg/character/${encodeURIComponent(nickname)}`,

    rainbowSix: nickname =>
        `https://r6.tracker.network/r6siege/profile/xbl/${encodeURIComponent(nickname)}/overview`,
};

module.exports = gameProfileUrls;