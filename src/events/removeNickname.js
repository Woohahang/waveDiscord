//  src/services/removeNickname.js , 등록된 닉네임 삭제

const userSchema = require('../models/userSchema.js');

function generateMessage(removeKeys) {
    let message = '';

    for (let i = 0; i < removeKeys.length; i++) {
        const key = removeKeys[i];
        switch (key) {
            case 'steam':
                message += '스팀';
                break;
            case 'kakao':
                message += '카카오 배틀 그라운드';
                break;
            case 'riotGames':
                message += '라이엇 게임즈';
                break;
            default:
                message += '등록되지 않은 닉네임 : ' + key;
        }

        // 마지막 요소가 아니면 쉼표를 추가합니다.
        if (i < removeKeys.length - 1) {
            message += ', ';
        }
    }

    return message + ' 의 닉네임 삭제완료.';
}

module.exports = async (interaction) => {
    try {
        const userId = interaction.member.id;

        // 받아온 값
        const removeKeys = interaction.values;

        // 데이터베이스에서 해당 닉네임 삭제
        const updateQuery = {};

        // removeKeys 배열의 각 요소를 처리하여 updateQuery에 추가합니다.
        removeKeys.forEach(key => {
            updateQuery[key] = ''; // 각 키를 빈 문자열로 업데이트합니다.
        });

        const userData = await userSchema.findOneAndUpdate(
            { userId: userId },
            updateQuery,
            { new: true }
        );

        await userData.save();

        await interaction.reply({
            content: generateMessage(removeKeys),
            ephemeral: true
        });

    } catch (error) {
        console.error('닉네임 삭제 중 오류 발생:', error);
        await interaction.reply({ content: '닉네임 삭제 중 오류가 발생했습니다.', ephemeral: true });
    }
};