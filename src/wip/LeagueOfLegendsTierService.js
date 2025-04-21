const LeagueOfLegendsTier = require('./leagueOfLegendsTier');

class LeagueOfLegendsTierService {

    /**
     * 유저의 리그오브레전드 티어 정보를 저장하거나 업데이트합니다.
     * 
     * @param {string} userId - Discord 유저 ID
     * @param {string} nickname - 소환사 닉네임 (ex: 이름#KR1)
     * @param {Object} tierData - Riot API로부터 받은 티어 데이터
     */
    async saveTier(userId, nickname, tierData) {
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
            console.error('[LeagueOfLegendsTierService] 티어 저장 실패:', error);
            throw error;
        }
    }
}

module.exports = LeagueOfLegendsTierService;