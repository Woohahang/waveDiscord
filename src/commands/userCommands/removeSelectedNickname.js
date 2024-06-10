// removeSelectedNickname.js

const { SlashCommandBuilder, StringSelectMenuBuilder, ActionRowBuilder } = require('discord.js');

const UserSettings = require('../../services/UserSettings');

function generateOptions(userData) {
    const options = [];

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

    platforms.forEach(platform => {
        if (userData[platform.key]) {
            userData[platform.key].forEach(nickName => {

                if (platform.key === 'steam') {
                    options.push({
                        value: platform.key + '_' + nickName.playerName,
                        label: nickName.playerName,
                        description: platform.description
                    });
                } else {
                    options.push({
                        value: platform.key + '_' + nickName,
                        label: nickName,
                        description: platform.description
                    });
                };

            });
        }
    });

    console.log(options);

    return options;
};

// 등록 된 닉네임 메뉴
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
    data: new SlashCommandBuilder()
        .setName('닉네임삭제')
        .setDescription('등록 된 닉네임을 삭제합니다.'),

    async execute(interaction) {
        try {
            const userId = interaction.member.id;

            // 인스턴스 생성
            const userSettings = new UserSettings(userId);

            // 유저 데이터 불러오기
            const userData = await userSettings.load();

            if (!userData) {
                await interaction.reply({
                    content: '등록된 정보가 없습니다.',
                    ephemeral: true
                });

                return;
            };

            // 등록 된 닉네임 가공 : 제목, 설명, 값
            const userNicknames = generateOptions(userData);

            // 닉네임 개수
            const namesLength = userNicknames.length;

            // 0개라면 등록 된 닉네임이 없다.
            if (namesLength <= 0) { return await interaction.reply({ content: '등록된 닉네임이 없습니다.', ephemeral: true }); }

            // 등록 된 닉네임 메뉴
            const row = selectMenu(userNicknames, namesLength);

            // 메뉴 전송
            await interaction.reply({
                content: '등록 된 닉네임을 삭제합니다! 메뉴를 선택해주세요!',
                components: [row],
                ephemeral: true
            });

        } catch (error) {
            console.error('removeSelectedNickname.js 에러 : ', error);
            await interaction.reply({ content: '닉네임 삭제 중 오류가 발생했습니다.', ephemeral: true });
        };
    }
};