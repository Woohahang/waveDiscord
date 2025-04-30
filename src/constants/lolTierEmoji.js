const botInfo = require('../utils/botInfo');

// 봇 ID에 따른 롤 티어 이모지 ID 맵핑
const lolTierEmojiIdMap = {
    // Wave (ID: 1227561479801409566)
    '1227561479801409566': {
        CHALLENGER: '1365067284774654043',
        GRANDMASTER: '1365067306119462932',
        MASTER: '1365067320061591663',
        DIAMOND: '1365067337170161665',
        EMERALD: '1365067353624412191',
        PLATINUM: '1365067371181506600',
        GOLD: '1365067400168476785',
        SILVER: '1365067428219977798',
        BRONZE: '1365067462227529901',
        IRON: '1365067472470016032',

        CLASH: '1365068958226583624'
    },

    // WaveTest (ID: 1234318546641752144)
    '1234318546641752144': {
        CHALLENGER: '1366852841490223104',
        GRANDMASTER: '1366852859089522708',
        MASTER: '1366852883357634761',
        DIAMOND: '1366852949040435272',
        EMERALD: '1366852969223422012',
        PLATINUM: '1366852985535074386',
        GOLD: '1366852996687859783',
        SILVER: '1366853010344378528',
        BRONZE: '1366853022621368330',
        IRON: '1366853032922447872',

        CLASH: '1366971358763810816'
    }
};

/**
 * 롤 티어에 해당하는 이모지를 반환합니다.
 * 
 * @param {string} tier - 롤 티어 (예: CHALLENGER, DIAMOND 등)
 * @returns {string} - 해당 티어에 맞는 이모지
 * @throws {Error} - 만약 유효한 티어가 아니거나 이모지가 없다면 오류를 던집니다.
 */
function getLoLTierEmoji(tier) {
    const { botId, botTag } = botInfo.get(); // 봇 정보 가져오기
    const emojiIdMap = lolTierEmojiIdMap[botId]; // 봇 ID에 맞는 이모지 맵핑 찾기

    // 해당 티어에 맞는 이모지가 없으면 오류 발생
    if (!emojiIdMap || !emojiIdMap[tier])
        throw new Error(`[lolTierEmoji.getLoLTierEmoji] '${tier}' 티어 이름을 찾을 수 없습니다 (botTag: ${botTag})`);

    // 이모지 반환
    return `<:${tier.toLowerCase()}:${emojiIdMap[tier]}>`;
};

module.exports = getLoLTierEmoji;