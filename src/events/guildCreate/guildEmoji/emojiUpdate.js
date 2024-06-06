// emojiUpdate.js

const fs = require('fs');
const path = require('path');

const GuildSettings = require('../../../services/GuildSettings');
const filterOptions = require('../../../module/data/filterOptions');


const { clientId } = require('../../../../../config.json');
const { emojiNames } = require('../../../module/server/emojiNames');

module.exports = async (guild) => {
    try {
        // 길드 인스턴스 생성 및 불러오기
        const guildSettings = new GuildSettings(guild.id);
        const guildData = await guildSettings.loadOrCreate();

        // 모든 이모지를 패치합니다.
        const guildEmojis = await guild.emojis.fetch();

        // Wave 의 이모지만 필터링합니다.
        const waveEmojis = guildEmojis.filter(emoji => emoji.user && emoji.user.id === clientId);

        // 이모지 이름들을 가지고 옵니다.
        const existingEmojiNames = waveEmojis.map(emoji => emoji.name);

        // 중복되지 않는 이모지 필터링
        const newEmojiNames = emojiNames.filter(name => !existingEmojiNames.includes(name));

        // 길드에서 보이는 메뉴만 가지고 온다.
        const trueValueKeys = filterOptions(guildData, true);

        // 이모지 등록
        for (const emojiName of newEmojiNames) {
            const imagePath = path.join(__dirname, '../../../../register/emoji/', `${emojiName}.png`);

            // 파일이 존재하고, 길드 데이터의 게임 항목이 true 항목 만 이모지 등록
            if (fs.existsSync(imagePath) && trueValueKeys.includes(emojiName.split('_')[1])) {
                try {
                    // 이모지 추가
                    await guild.emojis.create({
                        attachment: imagePath,
                        name: emojiName
                    });
                    console.log(`${emojiName} 이모지가 서버에 추가되었습니다.`);
                } catch (error) {
                    console.error(`${emojiName} 이모지를 추가하는 도중 에러가 발생했습니다:`, error);
                };
            };
        };




        // 등록되지 않은 이모지 제거 로직
        const emojisToRemove = waveEmojis.filter(emoji => !emojiNames.includes(emoji.name));

        for (const emoji of emojisToRemove) {
            try {
                // 이모지 삭제
                await emoji.delete();
                console.log(`${emoji.name} 이모지가 서버에서 제거되었습니다.`);
            } catch (error) {
                console.error(`${emoji.name} 이모지를 제거하는 도중 에러가 발생했습니다:`, error);
            }
        }

    } catch (error) {
        console.error('emojiUpdate.js 에러 : ', error);
    };
};