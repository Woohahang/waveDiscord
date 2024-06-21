const { SlashCommandBuilder, StringSelectMenuBuilder, ActionRowBuilder } = require('discord.js');
const UserSettings = require('../../services/UserSettings');
const logUserInfo = require('../../utils/log/logUserInfo');

// 유저 데이터에서 닉네임 옵션을 생성하는 함수입니다.
function generateOptions(userData) {
    const options = [];

    // 플랫폼 목록을 정의합니다.
    const platforms = [
        { key: 'steam', description: '스팀' },
        { key: 'leagueOfLegends', description: '리그 오브 레전드' },
        { key: 'teamfightTactics', description: '롤토체스' },
        { key: 'valorant', description: '발로란트' },
        { key: 'steamBattleGround', description: '스팀 배틀 그라운드' },
        { key: 'kakaoBattleGround', description: '카카오 배틀 그라운드' },
        { key: 'blizzard', description: '블리자드' },
        { key: 'overWatchTwo', description: '오버워치 2' }
    ];

    // 각 플랫폼을 순회하면서 유저 데이터에 해당 플랫폼이 있는지 확인합니다.
    platforms.forEach(platform => {
        if (userData[platform.key]) {
            userData[platform.key].forEach(nickName => {

                // 스팀의 경우 playerName을 사용하고, 그 외에는 닉네임을 사용합니다.
                if (platform.key === 'steam') {
                    options.push({
                        value: platform.key + ':' + nickName.playerName,
                        label: nickName.playerName,
                        description: platform.description
                    });
                } else {
                    options.push({
                        value: platform.key + ':' + nickName,
                        label: nickName,
                        description: platform.description
                    });
                };

            });
        }
    });

    return options;
};

// 등록된 닉네임을 선택할 수 있는 메뉴를 생성하는 함수입니다.
function selectMenu(userNicknames, namesLength) {
    const selectedNames = new StringSelectMenuBuilder()
        .setCustomId('removeNickNames')
        .setPlaceholder('선택하세요!')
        .addOptions(userNicknames)
        .setMinValues(1)
        .setMaxValues(namesLength);

    const row = new ActionRowBuilder().addComponents(selectedNames);

    return row;
};

module.exports = {
    // 슬래시 명령어를 정의합니다.
    data: new SlashCommandBuilder()
        .setName('닉네임삭제')
        .setDescription('등록 된 닉네임을 삭제합니다.'),

    // 명령어 실행 시 호출되는 함수입니다.
    async execute(interaction) {
        try {
            const userId = interaction.member.id;

            // 유저 인스턴스 생성 및 유저 데이터를 불러옵니다.
            const userSettings = new UserSettings(userId);
            const userData = await userSettings.load();

            // 유저 데이터가 없으면 메시지를 보냅니다.
            if (!userData) {
                await interaction.reply({
                    content: '등록된 정보가 없습니다.',
                    ephemeral: true
                });

                return;
            };

            // 유저 닉네임 옵션을 생성합니다.
            const userNicknames = generateOptions(userData);

            // 닉네임 개수를 확인합니다.
            const namesLength = userNicknames.length;

            // 닉네임이 없으면 메시지를 보냅니다.
            if (namesLength <= 0) { return await interaction.reply({ content: '등록된 닉네임이 없습니다.', ephemeral: true }); }

            // 닉네임 선택 메뉴를 생성합니다.
            const row = selectMenu(userNicknames, namesLength);

            // 닉네임 선택 메뉴를 전송합니다.
            await interaction.reply({
                content: '등록 된 닉네임을 삭제합니다! 메뉴를 선택해주세요!',
                components: [row],
                ephemeral: true
            });

        } catch (error) {
            // 에러 발생 시 로그를 남기고 에러 메시지를 전송합니다.
            logUserInfo(interaction);
            console.error('removeSelectedNickname.js 에러 : ', error);
            await interaction.reply({ content: '닉네임 삭제 중 오류가 발생했습니다.', ephemeral: true });
        };
    }
};