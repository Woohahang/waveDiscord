// 정리할 예정

const visibilitySchema = require('../mongoDB/visibilitySchema.js');

module.exports = async (interaction) => {
    if (!interaction.isStringSelectMenu()) return; // 셀렉트 메뉴 상호작용인지 확인

    try {
        const selections = interaction.values; // 사용자가 선택한 옵션
        const targetGuildId = interaction.guildId; // 길드 ID

        let visibilityData = await visibilitySchema.findOne({ guildId: targetGuildId }); // 길드 데이터 찾기

        if (!visibilityData) {
            console.error('길드 데이터를 찾을 수 없습니다.');
            return;
        }

        selections.forEach(selection => {
            const gameKey = selection.replace('hide', ''); // 'hideSteam' -> 'steam'
            visibilityData[gameKey] = true; // 데이터베이스의 해당 게임 값을 true로 설정
        });

        await visibilityData.save(); // 변경사항 저장

        await interaction.reply({
            content: '선택한 게임을 메뉴에서 숨겼습니다.',
            ephemeral: true
        });

    } catch (error) {
        console.error('메뉴 숨기기 처리 중 에러 발생:', error);

        await interaction.reply({
            content: '오류가 발생했습니다. 다시 시도해주세요.',
            ephemeral: true
        });

    }
}

