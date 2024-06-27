const InvalidProfileLinkError = require('../../../utils/errors/InvalidProfileLinkError');
const UserProfileNotFoundError = require('../../../utils/errors/UserProfileNotFoundError');
const axios = require('axios');
const { steamApiKey } = require('../../../../../config.json');

async function fetchSteamProfile(profileLink) {
    try {
        let steamId;

        // 프로필 링크에서 Steam ID 추출
        const steamIdMatch = profileLink.match(/\/profiles\/(\d+)/);
        if (steamIdMatch) {
            steamId = steamIdMatch[1];
        } else {
            // 사용자 정의 URL에서 Steam ID 추출
            const customUrlMatch = profileLink.match(/\/id\/([^\/]+)/);
            if (!customUrlMatch) {
                throw new InvalidProfileLinkError('유효하지 않은 프로필 링크, profileLink : ' + profileLink);
            };

            const customUrl = customUrlMatch[1];
            const resolveUrl = `https://api.steampowered.com/ISteamUser/ResolveVanityURL/v1/?key=${steamApiKey}&vanityurl=${customUrl}`;
            const { data: { response } } = await axios.get(resolveUrl);

            if (response.success !== 1) {
                throw new UserProfileNotFoundError('유저 정보를 찾을 수 없습니다.');
            }

            steamId = response.steamid;
        }

        const url = `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${steamApiKey}&steamids=${steamId}`;
        const { data: { response: { players } } } = await axios.get(url);

        if (players.length === 0) {
            throw new UserProfileNotFoundError('유저 정보를 찾을 수 없습니다.');
        }

        // 스팀 닉네임
        const playerName = players[0].personaname;

        return { playerName, profileLink };

    } catch (error) {
        throw error;
    }
};

module.exports = fetchSteamProfile;