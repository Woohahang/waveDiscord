/**
 * 주어진 게임 이름에 해당하는 이모지 ID를 반환하는 함수입니다.
 * 
 * @param {string} gameName - 이모지 ID를 가져올 게임의 이름.
 * @returns {string|null} - 게임 이름에 해당하는 이모지 ID를 반환합니다.
*/
function emojiId(gameName) {
    switch (gameName) {
        case 'leagueOfLegends':
            return '1340150566801637496';

        case 'overWatchTwo':
            return '1340150585655165069';

        case 'valorant':
            return '1340150638167720057';

        case 'steamBattleGround':
            return '1340150616495755294';

        case 'steam':
            return '1340150607302103183';

        case 'rainbowSix':
            return '1340150594220064809';

        case 'lostArk':
            return '1340150575756480523';

        case 'kakaoBattleGround':
            return '1340150557515579543';

        case 'blizzard':
            return '1340150546958389319';

        case 'apex':
            return '1340150527169659023';

        case 'teamfightTactics':
            return '1277689044607963368';

        default:
            return null;
    };
};

module.exports = emojiId;