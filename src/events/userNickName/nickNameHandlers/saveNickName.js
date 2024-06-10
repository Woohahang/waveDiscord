// saveNickName.js

const UserSettings = require('../../../services/UserSettings');
const formatRiotTag = require('../nickNameModules/formatRiotTag');
const statusMessage = require('../nickNameModules/statusMessage');
const fetchSteamProfile = require('../nickNameModules/fetchSteamProfile');
const logUserInfo = require('../../../utils/log/logUserInfo');
const errorMessage = require('../nickNameModules/errorMessage');

const riotGames = ['leagueOfLegends', 'teamfightTactics', 'valorant'];

module.exports = async (interaction) => {
    try {
        // '업데이트 중' 메시지 전송
        await interaction.deferReply({ ephemeral: true });

        const userId = interaction.member.id;

        // customId, submitNickname_게임종류
        const customId = interaction.customId;

        // steam, leagueOfLegends 등등 ..
        const gameType = customId.split('_')[1];

        // 닉네임 가지고 오기
        let nickName = interaction.fields.getTextInputValue(customId);

        // 라이엇 게임즈 태그 체크
        if (riotGames.includes(gameType)) {
            nickName = formatRiotTag(nickName);
        };

        if (gameType === 'steam') {
            // 스팀이면 오브젝트로 반환 { playerName, profileLink }
            nickName = await fetchSteamProfile(nickName);
        };

        // 인스턴스 생성 및 닉네임 저장
        const userSettings = new UserSettings(userId);
        const status = await userSettings.saveNickName(gameType, nickName);

        // 메세지 전송
        await interaction.editReply({ content: statusMessage(status), ephemeral: true });

    } catch (error) {
        const code = error.code;

        switch (code) {
            case 'INVALID_PROFILE_LINK':
                await interaction.editReply({ content: errorMessage(code), ephemeral: true });
                break;

            case 'USER_PROFILE_NOT_FOUND':
                await interaction.editReply({ content: errorMessage(code), ephemeral: true });
                break;

            default:
                logUserInfo(interaction);
                console.error('saveNickName.js 에러 : ', error);
                await interaction.editReply({ content: '알 수 없는 이유로 에러가 발생했습니다. 문제가 지속되면 Wave 디스코드 채널로 문의해 주세요.', ephemeral: true });
        };

    };
};