const buildMainSetupButtons = require('../components/buildMainSetupButtons');
const buildGuildNicknameSelectMenu = require('../components/buildGuildNicknameSelectMenu');

const MAIN_CHANNEL_MESSAGE =
    '## :star: Wave 메인 명령어\n' +
    '## /닉네임등록  /닉네임삭제';

module.exports = function buildMainChannelPayload(enabledGames) {
    return {
        content: MAIN_CHANNEL_MESSAGE,
        components: [
            buildGuildNicknameSelectMenu(enabledGames),
            buildMainSetupButtons(),
        ],
    };
};