//  removeNickname.js , 등록된 닉네임 삭제

const userSchema = require('../../mongoDB/userSchema.js');


/* 원본 */
// module.exports = async (interaction) => {
//     try {
//         // 유저 id
//         const userId = interaction.member.id;

//         // 게임타입_닉네임 을 가지고 오기 위함
//         const selectedOptions = interaction.values.map(value => interaction.message.components[0].components[0].options.find(option => option.value === value));

//         // 유저 데이터
//         const userData = await userSchema.findOne({ userId });

//         // 각 선택된 옵션에 대해 닉네임 삭제
//         selectedOptions.forEach(option => {
//             const [gameType, nickName] = option.value.split('_');

//             // 해당 게임 타입의 배열에서 닉네임 제거
//             if (userData[gameType]) {
//                 const index = userData[gameType].indexOf(nickName);
//                 if (index > -1) {
//                     userData[gameType].splice(index, 1);
//                 };
//             };
//         });

//         // 변경된 스키마를 저장
//         await userData.save();

//         await interaction.update({
//             content: '닉네임 삭제 완료',
//             components: [],
//             ephemeral: true
//         });

//     } catch (error) {
//         console.error('removeNickname.js', error);
//     };
// };



/* 수정본 */
module.exports = async (interaction) => {
    try {
        // 유저 id
        const userId = interaction.member.id;

        // 아 뭐야 이거 그냥 이렇게 들고 와서 분리하면 되네 ;;
        console.log('interaction.values : ', interaction.values);

        // 게임타입_닉네임 을 가지고 오기 위함
        const selectedOptions = interaction.values.map(value => interaction.message.components[0].components[0].options.find(option => option.value === value));

        console.log('selectedOptions : ', selectedOptions);

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