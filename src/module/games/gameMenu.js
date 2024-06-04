// gameMenu.js

const { StringSelectMenuBuilder, StringSelectMenuOptionBuilder, ActionRowBuilder } = require('discord.js');
const { gameLabels, description } = require('../games/gameData');

// guildData 객체에서 값이 true 만 가지고 옵니다.
function filterOptions(guildData) {
    // 객체를 가져옵니다.
    const obj = guildData.toObject();

    // 객체의 모든 키를 배열로 가져옵니다.
    const keys = Object.keys(obj);

    // true 만 필터링합니다.
    return keys.filter(key => obj[key] === true);
};

// 모든 데이터가 숨김 상태인지 아닌지 체크
function createOptions(trueValueKeys) {
    if (trueValueKeys.length === 0) {
        return new StringSelectMenuOptionBuilder()
            .setLabel('등록 가능한 메뉴 없음')
            .setDescription('관리자에 의해 모든 메뉴 숨김 상태.')
            .setValue('noOptions')

    } else {
        return trueValueKeys.map(field => {
            let fieldDescription = description[field] + ' 닉네임';
            if (field === 'steam') {
                fieldDescription = '스팀 프로필 주소';
            }

            return new StringSelectMenuOptionBuilder()
                .setLabel(gameLabels[field])
                .setDescription(fieldDescription)
                .setValue(field);
        });
    };
};

// 서버에서 보이도록 설정 된 메뉴만 반환합니다.
module.exports = (guildData) => {
    try {
        // 길드 데이터에서 true 메뉴만 가지고 오기
        const trueValueKeys = filterOptions(guildData);

        // 길드 데이터에 따라 나타날 메뉴를 정합니다.
        const options = createOptions(trueValueKeys);

        const select = new StringSelectMenuBuilder()
            .setCustomId('gameMenu')
            .setPlaceholder('닉네임 등록 !')
            .addOptions(options);

        const row = new ActionRowBuilder()
            .addComponents(select);

        return row;
    } catch (error) {
        console.error('gameMenu.js 에러 : ', error);
    };
};