//  src/services/removeNickname.js , 등록된 닉네임 삭제

const userSchema = require('../models/userSchema.js');

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

        const userDataObject = userData.toObject(); // Mongoose Document를 JavaScript Object로 변환합니다.
        delete userDataObject.userId;
        delete userDataObject.updatedAt;
        delete userDataObject._id;
        delete userDataObject.__v;
        const isAllEmpty = Object.values(userDataObject).every(value => value === '');

        if (isAllEmpty) {
            // 모든 값이 비어있다면 사용자 정보를 완전히 삭제합니다.
            await userSchema.deleteOne({ userId });
            return await interaction.reply({
                content: '정보를 완전히 삭제했습니다.',
                ephemeral: true
            });
        } else {
            // 어떤 닉네임이 삭제 되었는지 알려줍니다.
            await interaction.reply({
                content: '닉네임 삭제 완료',
                ephemeral: true
            });
        }

    } catch (error) {
        console.error('닉네임 삭제 중 오류 발생:', error);
        await interaction.reply({ content: '닉네임 삭제 중 오류가 발생했습니다.', ephemeral: true });
    }
};