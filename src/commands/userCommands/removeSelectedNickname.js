// removeSelectedNickname.js

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
            // 유저 정보 조회
            let userData = await UserSettings.load(interaction.member.id);
            if (!userData) { return await interaction.reply({ content: '등록된 정보가 없습니다.', ephemeral: true }); }

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
































// function generateOptions(userData) {
//     const options = [];

//     const platforms = [
//         { key: 'steam', description: '스팀' },
//         { key: 'loL', description: '리그 오브 레전드' },
//         { key: 'tfT', description: '롤토체스' },
//         { key: 'steamBG', description: '스팀 배틀 그라운드' },
//         { key: 'kakao', description: '카카오 배틀 그라운드' },
//         { key: 'overWatchTwo', description: '오버워치 2' }
//     ];

//     platforms.forEach(platform => {
//         if (userData[platform.key]) {
//             userData[platform.key].forEach(item => {
//                 options.push({
//                     value: platform.key + '_' + item,
//                     label: item,
//                     description: platform.description
//                 });
//             });
//         }
//     });

//     return options;
// };

// // 등록 된 닉네임 메뉴
// function selectMenu(userNicknames, namesLength) {
//     const selectedNames = new StringSelectMenuBuilder()
//         .setCustomId('removeNickNames')
//         .setPlaceholder('선택하세요!')
//         .addOptions(userNicknames)
//         .setMinValues(1)
//         .setMaxValues(namesLength);

//     const row = new ActionRowBuilder().addComponents(selectedNames);

//     return row;
// };

// // 이거를 손 보기 전에 닉네임 저장할 때 중복된 닉네임 저장 X를 해야 되겠네

// module.exports = {
//     data: new SlashCommandBuilder()
//         .setName('닉네임삭제')
//         .setDescription('등록 된 닉네임을 삭제합니다.'),

//     async execute(interaction) {
//         try {
//             // 유저 정보 조회
//             let userData = await UserSettings.load(interaction.member.id);
//             if (!userData) { return await interaction.reply({ content: '등록된 정보가 없습니다.', ephemeral: true }); }

//             // 등록 된 닉네임 가공 : 제목, 설명, 값
//             const userNicknames = generateOptions(userData);

//             // 닉네임 개수
//             const namesLength = userNicknames.length;

//             // 0개라면 등록 된 닉네임이 없다.
//             if (namesLength <= 0) { return await interaction.reply({ content: '등록된 닉네임이 없습니다.', ephemeral: true }); }

//             // 등록 된 닉네임 메뉴
//             const row = selectMenu(userNicknames, namesLength);

//             // 메뉴 전송
//             await interaction.reply({
//                 content: '등록 된 닉네임을 삭제합니다! 메뉴를 선택해주세요!',
//                 components: [row],
//                 ephemeral: true
//             });

//         } catch (error) {
//             console.error('removeSelectedNickname.js 에러 : ', error);
//             await interaction.reply({ content: '닉네임 삭제 중 오류가 발생했습니다.', ephemeral: true });
//         };
//     }
// };
