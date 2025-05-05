const BOT_IDS = require('./botIds');
const GAME_TYPES = require('./gameTypes');
const botInfo = require('../utils/botInfo');

// 봇 ID에 따른 롤 티어 이모지 ID 맵핑
const gameLogoEmojiMap = {
    [BOT_IDS.WAVE]: {
        [GAME_TYPES.STEAM]: '1340150607302103183',
        [GAME_TYPES.STEAM_BATTLEGROUNDS]: '1340150616495755294',
        [GAME_TYPES.KAKAO_BATTLEGROUNDS]: '1340150557515579543',
        [GAME_TYPES.LEAGUE_OF_LEGENDS]: '1340150566801637496',
        [GAME_TYPES.TEAMFIGHT_TACTICS]: '1277689044607963368',
        [GAME_TYPES.VALORANT]: '1340150638167720057',
        [GAME_TYPES.OVERWATCH_2]: '1340150585655165069',
        [GAME_TYPES.RAINBOW_SIX]: '1340150594220064809',
        [GAME_TYPES.LOST_ARK]: '1340150575756480523',
        [GAME_TYPES.BLIZZARD]: '1340150546958389319'
    },

    [BOT_IDS.WAVE_TEST]: {
        [GAME_TYPES.STEAM]: '1340152828475342871',
        [GAME_TYPES.STEAM_BATTLEGROUNDS]: '1367150183661572178',
        [GAME_TYPES.KAKAO_BATTLEGROUNDS]: '1339722846124900405',
        [GAME_TYPES.LEAGUE_OF_LEGENDS]: '1339722857063649280',
        [GAME_TYPES.TEAMFIGHT_TACTICS]: '1367150131358466138',
        [GAME_TYPES.VALORANT]: '1367150064082096178',
        [GAME_TYPES.OVERWATCH_2]: '1339722876244463752',
        [GAME_TYPES.RAINBOW_SIX]: '1339722898272817233',
        [GAME_TYPES.LOST_ARK]: '1339722866341707786',
        [GAME_TYPES.BLIZZARD]: '1339722782782787686'
    }
};

function getGameLogoEmoji(gameType) {
    const { botId, botTag } = botInfo.get(); // 봇 정보 가져오기
    const emojiIdMap = gameLogoEmojiMap[botId]; // 봇 ID에 맞는 이모지 맵핑 찾기

    // 해당 게임에 맞는 이모지가 없으면 오류 발생
    if (!emojiIdMap || !emojiIdMap[gameType])
        throw new Error(`[gameLogoEmoji.getGameLogoEmoji] '${gameType}' 게임 이름을 찾을 수 없습니다 (botTag: ${botTag})`);

    return `<:${gameType}:${emojiIdMap[gameType]}>`;
}

module.exports = getGameLogoEmoji;