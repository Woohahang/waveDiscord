// emojiUpdate.js

const fs = require('fs');
const path = require('path');
const GuildSettings = require('../../../services/GuildSettings');
const filterOptions = require('../../../module/data/filterOptions');
const { clientId } = require('../../../../../config.json');

// 이모지 등록, 길드에서 나타난 메뉴의 이모지를 등록합니다.
async function emojiRegister(guild, guildEmojis, trueValueKeys) {
    try {
        // 이미 등록 된 이모지들
        const filterEmoji = guildEmojis
            .filter(guildEmoji => trueValueKeys.includes(guildEmoji.name.split('_')[1]))
            .map(emoji => emoji.name.split('_')[1]);
        if (!filterEmoji) return;

        // 이모지 등록
        trueValueKeys.forEach(async trueGame => {
            const imagePath = path.join(__dirname, '../../../../register/emoji/wave_' + trueGame + '.png');
            if (fs.existsSync(imagePath) && !filterEmoji.includes(trueGame)) {

                await guild.emojis.create({
                    attachment: imagePath,
                    name: 'wave_' + trueGame
                });

                console.log('이모지가 서버에 추가되었습니다.' + 'wave_' + trueGame);
            };
        });

    } catch (error) {
        console.error('emojiUpdate.js 의 ', error);
    };
};

// 이모지 제거, 길드에서 숨겨진 메뉴의 이모지를 제거합니다.
async function emojiDelete(guild, guildEmojis, trueValueKeys) {
    try {
        // Wave 이모지 중에, 길드에서 설정한 true 게임이 아닌 모든 이모지들
        const deleteEmojis = guildEmojis.filter(emoji =>
            emoji.author.id === clientId &&
            !trueValueKeys.includes(emoji.name.split('_')[1])
        );

        // 이모지 삭제
        deleteEmojis.forEach(async emoji => {
            await guild.emojis.delete(emoji.id)
                .then(() => console.log(`이모지 삭제 ${emoji.name}`))
                .catch(() => console.error('이모지 삭제 실패 : ', emoji.name));
        });
    } catch (error) {
        console.error('emojiUpdate.js 의 emojiDelete 에러 : ', error);
    };
};

/* 이모지 업데이트 */
module.exports = async (guild) => {
    try {
        // 길드 인스턴스 생성 및 불러오기
        const guildSettings = new GuildSettings(guild.id);
        const guildData = await guildSettings.loadOrCreate();

        // 모든 이모지를 패치합니다.
        const guildEmojis = await guild.emojis.fetch();

        // 길드에 보이도록 설정 된 모든 게임
        const trueValueKeys = filterOptions(guildData, true);

        await Promise.all([
            emojiRegister(guild, guildEmojis, trueValueKeys),
            emojiDelete(guild, guildEmojis, trueValueKeys)
        ]);

    } catch (error) {
        console.error('emojiUpdate.js 에러 : ', error);
    };
};