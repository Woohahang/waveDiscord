// fetchSteamProfile.js

const InvalidProfileLinkError = require('../../../utils/errors/InvalidProfileLinkError');
const UserProfileNotFoundError = require('../../../utils/errors/UserProfileNotFoundError');
const axios = require('axios');
const { steamApiKey } = require('../../../../../config.json');

async function fetchSteamProfile(profileLink) {
    try {
        // 프로필 링크에서 Steam ID 추출
        const steamIdMatch = profileLink.match(/\/profiles\/(\d+)/);
        if (!steamIdMatch) {
            throw new InvalidProfileLinkError('유효하지 않은 프로필 링크, profileLink : ' + profileLink);
        };

        // user 의 steam 고유 id
        const steamId = steamIdMatch[1];
        const url = `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${steamApiKey}&steamids=${steamId}`;

        const { data: { response: { players } } } = await axios.get(url);

        if (players.length === 0) {
            throw new UserProfileNotFoundError('유저 정보를 찾을 수 없습니다.');
        };

        // 스팀 닉네임
        const playerName = players[0].personaname;

        return { playerName, profileLink };

    } catch (error) {
        throw error;
    };
};

module.exports = fetchSteamProfile;