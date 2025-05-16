const axios = require('axios');
const { RIOT_API_KEY } = require('../../../../config.json');

/**
 * 라이엇 닉네임으로 리그오브레전드 티어 정보를 가져옵니다.
 * 
 * @param {string} nickname - 소환사 닉네임 (ex: '소환사이름#KR1')
 * @returns {Object|null} 티어 정보 객체 또는 null
 */
async function fetchLeagueTier(nickname) {

    const [gameNickname, tagLine] = nickname.split('#');
    if (!gameNickname || !tagLine) throw new Error('유효하지 않은 RiotTag 형식입니다.');

    try {
        // RIOT ID → PUUID 가져오기
        const accountRes = await axios.get(`https://asia.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${encodeURIComponent(gameNickname)}/${encodeURIComponent(tagLine)}`, {
            headers: { 'X-Riot-Token': RIOT_API_KEY }
        });

        const puuid = accountRes.data.puuid;

        // PUUID → Summoner Info 가져오기
        const summonerRes = await axios.get(`https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${puuid}`, {
            headers: { 'X-Riot-Token': RIOT_API_KEY }
        });

        const summonerId = summonerRes.data.id;

        // Summoner ID → 티어 정보 가져오기
        const leagueRes = await axios.get(`https://kr.api.riotgames.com/lol/league/v4/entries/by-summoner/${summonerId}`, {
            headers: { 'X-Riot-Token': RIOT_API_KEY }
        });

        const soloRank = leagueRes.data.find(entry => entry.queueType === 'RANKED_SOLO_5x5');

        return {
            summonerName: nickname,
            tier: soloRank?.tier ?? null,                 // 'DIAMOND', 'PLATINUM', 'GOLD' ..
            rank: soloRank?.rank ?? null,                 // 'I', 'II', 'III', 'IV'
            leaguePoints: soloRank?.leaguePoints ?? null, // 20LP ..
        };

    } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 404)
            return null;

        throw new Error(`[fetchLeagueTier] 티어 조회 중 오류 발생 | gameNickname: ${gameNickname} | tagLine: ${tagLine} | errorMessage: ${error.message}`);
    }
}

module.exports = fetchLeagueTier;