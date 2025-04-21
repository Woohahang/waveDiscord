const LeagueOfLegendsTier = require('./leagueOfLegendsTier');

/**
 * 유저의 리그오브레전드 티어 정보를 저장하거나 업데이트합니다.
 * 
 * @param {string} userId - Discord 유저 ID
 * @param {string} nickname - 소환사 닉네임 (포맷: '이름#KR1')
 * @param {Object} tierData - Riot API로부터 받은 티어 데이터
 * @returns {Promise<void>}
 */
async function saveLeagueOfLegendsTier(userId, nickname, tierData) {
    try {
        await LeagueOfLegendsTier.findOneAndUpdate(
            { userId, nickname },
            {
                ...tierData,
                updatedAt: new Date()
            },
            { upsert: true, new: true, setDefaultsOnInsert: true }
        );
    } catch (error) {
        console.error('[saveLeagueOfLegendsTier] 저장 실패:', error);
    }
}

module.exports = saveLeagueOfLegendsTier;
