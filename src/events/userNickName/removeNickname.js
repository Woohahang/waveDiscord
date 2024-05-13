//  src/services/removeNickname.js , 등록된 닉네임 삭제

const userSchema = require('../../mongoDB/userSchema.js');

async function removeNickname(interaction) {
    const userId = interaction.member.id;
    const selectedOptions = interaction.values.map(value => interaction.message.components[0].components[0].options.find(option => option.value === value));

    // 선택된 닉네임을 가진 유저의 스키마 찾기
    const userData = await userSchema.findOne({ userId });

    // 선택된 닉네임들을 유저의 스키마에서 제거
    selectedOptions.forEach(option => {
        const optionType = option.value.replace(/\d+/g, ''); // 'steam', 'kakao', 'loL' 중 하나
        const index = parseInt(option.value.replace(/\D+/g, '')); // 배열에서 삭제할 인덱스
        if (userData[optionType] && userData[optionType].length > index) {
            userData[optionType].splice(index, 1);
        };
    });

    // 변경된 스키마를 저장
    await userData.save();

    await interaction.update({
        content: '닉네임 삭제 완료',
        components: [],
        ephemeral: true
    });

    console.log('선택된 닉네임들이 성공적으로 삭제되었습니다.');
};

module.exports = { removeNickname };