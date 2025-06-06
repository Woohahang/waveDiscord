const getGameLogoEmoji = require("@constants/gameLogoEmoji");
const GAME_TYPES = require("@constants/gameTypes");
const platformNames = require("@constants/platformNames");
const platforms = require("@constants/platforms");
const getGamesLink = require("@shared/game/getGamesLink");

/**
 * 유저의 게임별 닉네임 정보를 { gameType, nickname } 형식으로 수집
 * @param {UserData} userData
 * @param {string[]} gameTypes
 * @returns {{ gameType: string, nickname: string }[]}
 */
function collectGameNicknames(userData, gameTypes) {
    return gameTypes.flatMap(gameType => {
        const nicknames = userData.getNicknameList(gameType);
        return nicknames.map(nickname => ({ gameType, nickname }));
    });
}

/**
 * gameType을 받아 해당 platform 이름 반환
 * @param {string} gameType
 * @returns {string | null}
 */
function getPlatformNameByGameType(gameType) {
    for (const [platformName, gameTypes] of Object.entries(platforms)) {
        if (gameTypes.includes(gameType)) {
            return platformName;
        }
    }
    return null;
}

/**
 * gameType을 받아서 플랫폼의 표시 이름 반환
 * @param {string} gameType
 * @returns {string} ex) 'Blizzard'
 */
function getPlatformDisplayNameByGameType(gameType) {
    const platformKey = getPlatformNameByGameType(gameType);
    return platformNames[platformKey];
}

function formatNickname(userData, gameType, nickname) {
    const emoji = getGameLogoEmoji(gameType);

    switch (gameType) {
        case GAME_TYPES.STEAM:
            const profileLink = userData.steam.getProfileLink(nickname);
            return `${emoji} [${nickname}](${profileLink})`;

        case GAME_TYPES.LEAGUE_OF_LEGENDS:
            return `${emoji} [${nickname}](${getGamesLink(gameType, nickname)})`;

        case GAME_TYPES.OVERWATCH_2:
        case GAME_TYPES.BLIZZARD:
            return `${emoji} ${nickname}`;

        default:
            return `${emoji} [${nickname}](${getGamesLink(gameType, nickname)})`;
    }
}

/**
 * 예시 출력 형식:
 *
 * {
 *   name: "Riot Games",
 *   value: "🎮 [닉네임1](https://...)\n🎮 [닉네임2](https://...)"
 * },
 * {
 *   name: "Blizzard",
 *   value: "🌀 닉네임3\n🌀 닉네임4"
 * }
 *
 * 반환 형식: { name: string, value: string }[] 형태의 Discord Embed 필드
 */
module.exports = (userData, gameTypes) => {

    // 유저가 등록한 닉네임 리스트를 { gameType, nickname } 형태로 수집
    const gameNicknames = collectGameNicknames(userData, gameTypes);

    // 플랫폼별 닉네임 목록을 담는 객체 (예: { riot: [...], blizzard: [...] })
    const platformFieldsMap = {};

    for (const { gameType, nickname } of gameNicknames) {
        if (!platformFieldsMap[gameType]) {
            platformFieldsMap[gameType] = [];
        }

        const displayName = formatNickname(userData, gameType, nickname); // 이모지, 링크 포함된 문자열

        platformFieldsMap[gameType].push(displayName);
    }

    // Discord Embed 필드 형식으로 변환: 각 플랫폼별로 구분된 name/value 객체 배열
    const fields = Object.entries(platformFieldsMap).map(([gameType, lines]) => ({
        name: `** ${getPlatformDisplayNameByGameType(gameType)} **`,
        value: lines.join('\n')
    }));

    return fields;
}