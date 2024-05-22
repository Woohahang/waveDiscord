// removeSelectedNickname.js 파일 수정 버전

const { SlashCommandBuilder, StringSelectMenuBuilder, ActionRowBuilder } = require('discord.js');
const UserSettings = require('../../services/UserSettings');

function generateOptions(userData) {
    const options = [];

    const platforms = [
        { key: 'steam', description: '스팀' },
        { key: 'loL', description: '리그 오브 레전드' },
        { key: 'tfT', description: '롤토체스' },
        { key: 'steamBG', description: '스팀 배틀 그라운드' },
        { key: 'kakao', description: '카카오 배틀 그라운드' },
        { key: 'overWatchTwo', description: '오버워치 2' }
    ];

    platforms.forEach(platform => {
        if (userData[platform.key]) {
            userData[platform.key].forEach((item, index) => {
                options.push({
                    value: `${platform.key}${index}`,
                    label: item,
                    description: platform.description
                });
            });
        }
    });

    return options;
};

module.exports = {
    data: new SlashCommandBuilder()
        .setName('닉네임삭제')
        .setDescription('등록 된 닉네임을 삭제합니다.'),

    async execute(interaction) {
        try {
            // UserSettings 클래스의 인스턴스 생성
            const userSettings = new UserSettings(interaction.member.id);
            // 사용자 설정 불러오기 또는 생성
            let userData = await userSettings.loadOrCreate();
            if (!userData) { return await interaction.reply({ content: '등록된 정보가 없습니다.', ephemeral: true }); }

            const userNicknames = generateOptions(userData);
            const namesLength = userNicknames.length;

            if (namesLength <= 0) { return await interaction.reply({ content: '등록된 닉네임이 없습니다.', ephemeral: true }); }

            const selectedNames = new StringSelectMenuBuilder()
                .setCustomId('removeNickNames')
                .setPlaceholder('선택하세요!')
                .addOptions(userNicknames)
                .setMinValues(1)
                .setMaxValues(namesLength);

            const row = new ActionRowBuilder().addComponents(selectedNames);

            await interaction.reply({
                content: '등록 된 닉네임을 삭제합니다! 메뉴를 선택해주세요!',
                components: [row],
                ephemeral: true
            });

        } catch (error) {
            console.error(error);
            await interaction.reply({ content: '닉네임 삭제 중 오류가 발생했습니다.', ephemeral: true });
        }
    }
};
