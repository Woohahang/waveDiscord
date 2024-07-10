const UserSettings = require('../../../services/UserSettings');
const formatRiotTag = require('../nickNameModules/formatRiotTag');
const statusMessage = require('../nickNameModules/statusMessage');
const fetchSteamProfile = require('../nickNameModules/fetchSteamProfile');
const logUserInfo = require('../../../utils/log/logUserInfo');
const errorMessage = require('../nickNameModules/errorMessage');


module.exports = async (interaction) => {
    try {
        // '업데이트 중' 메시지 전송
        await interaction.deferReply({ ephemeral: true });

        const userId = interaction.member.id;

        // customId, submitNickname_게임종류
        const customId = interaction.customId;

        // steam, leagueOfLegends 등등 ..
        const game = customId.split('_')[1];

        // 닉네임 가지고 오기
        let nickname = interaction.fields.getTextInputValue(customId);

        switch (game) {
            // 스팀
            case 'steam':
                nickname = await fetchSteamProfile(nickname);
                break;

            // 라이엇 게임즈
            case 'leagueOfLegends':
            case 'teamfightTactics':
            case 'valorant':
                nickname = formatRiotTag(nickname);
                break;

            // 각 게임마다 API 상호작용 추가할 예정.
            case 'steamBattleGround':
            case 'kakaoBattleGround':
            case 'blizzard':
            case 'overWatchTwo':
            case 'lostArk':
                break;

            default:
                throw new Error('알 수 없는 게임 종류 game : ', game);
        };

        // 인스턴스 생성 및 닉네임 저장
        const userSettings = new UserSettings(userId);
        const status = await userSettings.saveNickname(game, nickname);

        // 메세지 전송
        await interaction.editReply({ content: statusMessage(status), ephemeral: true });

    } catch (error) {
        const code = error.code;

        switch (code) {
            case 'INVALID_PROFILE_LINK':
            case 'USER_PROFILE_NOT_FOUND':
                await interaction.editReply({ content: errorMessage(code), ephemeral: true });
                break;

            default:
                logUserInfo(interaction);
                console.error('saveNickname.js 에러 : ', error);
                await interaction.editReply({ content: '알 수 없는 이유로 에러가 발생했습니다. 문제가 지속되면 Wave 디스코드 채널로 문의해 주세요.', ephemeral: true });
        };

    };
};