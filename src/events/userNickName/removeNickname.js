//  removeNickname.js , 등록된 닉네임 삭제

const userSchema = require('../../mongoDB/userSchema.js');

module.exports = async (interaction) => {
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
};










// module.exports = async (interaction) => {
//     try {
//         // 유저 id
//         const userId = interaction.member.id;

//         // 상세 정보 ex) { value: '0_loL', label: '끼매누', description: '리그 오브 레전드' },
//         // 상세 정보 ex) { value: '1_loL', label: '태태테', description: '리그 오브 레전드' },
//         console.log('여긴가?');
//         const selectedOptions = interaction.values.map(value => interaction.message.components[0].components[0].options.find(option => option.value === value));
//         console.log('여긴가?');
//         // 유저 데이터
//         const userData = await userSchema.findOne({ userId });

//         // await selectedOptions.forEach(option => {

//         //     // console.log(option);

//         //     // 0_loL 문자열을 분리하는 작업
//         //     const [gameType] = option.value.split('_');
//         //     const index = parseInt(indexStr, 10);

//         //     if (userData[gameType] && userData[gameType].length > index) {
//         //         userData[gameType].splice(index, 1);
//         //     };
//         // });

//         // 변경된 스키마를 저장
//         await userData.save();

//         await interaction.update({
//             content: '닉네임 삭제 완료',
//             components: [],
//             ephemeral: true
//         });

//     } catch (error) {
//         console.error('removeNickname.js', error);
//     }
// };


// 이거 삭제를 인덱스로 하는게 아니라
// 게임 타입_닉네임
// 이렇게 들고 와서 게임 타입 배열 안에 닉네임을 삭제하는 방식으로 써야 되겠는데?