// saveUserNickName.js

const userSchema = require('../../mongoDB/userSchema.js');

async function saveUserNickname(interaction) {

    const customId = interaction.customId.split('-')[0]; // "-submitNickname" 부분 제거
    let content = interaction.fields.getTextInputValue(`${customId}-submitNickname`);

    if (!content) return await interaction.reply({ content: "작성이 취소되었습니다.", ephemeral: true });

    let userData = await userSchema.findOne({ userId: interaction.member.id });

    // userData 가 없으면 만든다.
    if (!userData) {
        userData = new userSchema({ userId: interaction.member.id });
        await userData.save();
    };

    let limitReached = false;
    switch (customId) {
        case 'steamCode':
            userData.steam = content.substr(0, 100);
            break;

        case 'loLName':
            if (userData.loL.length > 4) {
                limitReached = true;
            } else {
                userData.loL.push(content.substr(0, 20));
                break;
            };

        case 'tfTName':
            if (userData.tfT.length > 4) {
                limitReached = true;
            } else {
                userData.tfT.push(content.substr(0, 20));
                break;
            };

        case 'steamBGName':
            if (userData.steamBG.length > 4) {
                limitReached = true;
            } else {
                userData.steamBG.push(content.substr(0, 20));
                break;
            };

        case 'kaKaoBGName':
            if (userData.kakao.length > 4) {
                limitReached = true;
            } else {
                userData.kakao.push(content.substr(0, 20));
            };
            break;

        case 'overWatchTwoName':
            if (userData.overWatchTwo.length > 4) {
                limitReached = true;
            } else {
                userData.overWatchTwo.push(content.substr(0, 20));
                break;
            };

    };

    if (limitReached) {
        return await interaction.reply({ content: "해당 항목의 닉네임 개수를 초과했습니다.", ephemeral: true });
    } else {
        await userData.save();
        return await interaction.reply({ content: "닉네임 등록 완료 !", ephemeral: true });
    };
};

module.exports = { saveUserNickname };