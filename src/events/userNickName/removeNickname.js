//  removeNickname.js , 등록된 닉네임 삭제

const userSchema = require('../../mongoDB/userSchema.js');

module.exports = async (interaction) => {
    try {
        // 유저 id
        const userId = interaction.member.id;

        // 게임타입_닉네임 을 가지고 오기 위함
        const selectedOptions = interaction.values.map(value => interaction.message.components[0].components[0].options.find(option => option.value === value));

        // 유저 데이터
        const userData = await userSchema.findOne({ userId });

        // 각 선택된 옵션에 대해 닉네임 삭제
        selectedOptions.forEach(option => {
            const [gameType, nickName] = option.value.split('_');

            // 해당 게임 타입의 배열에서 닉네임 제거
            if (userData[gameType]) {
                const index = userData[gameType].indexOf(nickName);
                if (index > -1) {
                    userData[gameType].splice(index, 1);
                };
            };
        });

        // 변경된 스키마를 저장
        await userData.save();

        await interaction.update({
            content: '닉네임 삭제 완료',
            components: [],
            ephemeral: true
        });

    } catch (error) {
        console.error('removeNickname.js', error);
    };
};


// 이거 삭제를 인덱스로 하는게 아니라
// 게임 타입_닉네임
// 이렇게 들고 와서 게임 타입 배열 안에 닉네임을 삭제하는 방식으로 써야 되겠는데?