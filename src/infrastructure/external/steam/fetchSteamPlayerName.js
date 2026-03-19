const axios = require('axios');
const steamApiKey = process.env.STEAM_API_KEY;
const UserProfileNotFoundError = require('../../../utils/errors/UserProfileNotFoundError');

const logger = require('@utils/logger');

async function fetchSteamPlayerName(profileLink) {
    try {
        let steamId;

        // 프로필 링크에서 Steam ID 추출
        const steamIdMatch = profileLink.match(/\/profiles\/(\d+)/);
        if (steamIdMatch) {
            steamId = steamIdMatch[1];
        } else {
            // 사용자 정의 URL -> Steam ID 변환
            const customUrl = profileLink.match(/\/id\/([^\/]+)/)[1];
            const resolveUrl = `https://api.steampowered.com/ISteamUser/ResolveVanityURL/v1/?key=${steamApiKey}&vanityurl=${customUrl}`;
            const { data: { response } } = await axios.get(resolveUrl);

            if (response.success !== 1) {
                throw new UserProfileNotFoundError('유저 정보를 찾을 수 없습니다.');
            }

            steamId = response.steamid;
        }

        const url = `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${steamApiKey}&steamids=${steamId}`;
        const { data } = await axios.get(url);

        if (!data.response.players || data.response.players.length === 0) {
            throw new UserProfileNotFoundError('유저 정보를 찾을 수 없습니다.');
        };

        return data.response.players[0].personaname;

    } catch (error) {
        logger.error('[fetchSteamPlayerName] Steam 닉네임 조회 실패', {
            errorMessage: error.message,
            profileLink
        })
        throw error;
    }
};

module.exports = fetchSteamPlayerName;