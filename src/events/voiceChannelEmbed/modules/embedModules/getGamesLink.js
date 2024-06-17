// getGamesLink.js

function formatLoLNickName(nickName) {
    return nickName.replace('#', '-');
};

function getGamesLink(game, nickName) {
    try {
        switch (game) {
            case 'leagueOfLegends':
                return `https://www.op.gg/summoners/kr/${encodeURIComponent(formatLoLNickName(nickName))}`;

            case 'teamfightTactics':
                return `https://lolchess.gg/profile/kr/${encodeURIComponent(formatLoLNickName(nickName))}`;

            case 'valorant':
                return `https://valorant.op.gg/profile/${encodeURIComponent(formatLoLNickName(nickName))}`;

            case 'steamBattleGround':
                return `https://pubg.op.gg/user/${encodeURIComponent(nickName)}`;

            case 'kakaoBattleGround':
                return `https://dak.gg/pubg/profile/kakao/${encodeURIComponent(nickName)}`;

            default:
                return '#';
        };
    } catch (error) {
        throw error;
    };
};

module.exports = getGamesLink;