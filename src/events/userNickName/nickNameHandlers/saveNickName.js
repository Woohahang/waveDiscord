// saveNickName.js

const UserSettings = require('../../../services/UserSettings');
const formatRiotTag = require('../nickNameModules/formatRiotTag');
const statusMessage = require('../nickNameModules/statusMessage');
const steamApi = require('../nickNameModules/steamApi');

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
            await steamApi(nickName);
        };


        // 인스턴스 생성 및 닉네임 저장
        const userSettings = new UserSettings(userId);
        const status = await userSettings.saveNickName(gameType, nickName);

        // 닉네임 저장 상태 결과 메세지
        const message = statusMessage(status);

        // 메세지 전송
        await interaction.editReply({ content: message, ephemeral: true });

    } catch (error) {
        console.error('saveNickName.js 에러 : ', error);
    };
};