// emojiRegister.js

const fs = require('fs');
const path = require('path');

/* 이모지 등록 */
async function emojiRegister(guild, guildEmojis, trueValueKeys) {
    try {
        // 이미 등록 된 이모지들
        const filterEmoji = guildEmojis
            .filter(guildEmoji => trueValueKeys.includes(guildEmoji.name.split('_')[1]))
            .map(emoji => emoji.name.split('_')[1]);

        // 이모지 등록 작업 준비
        const emojiPromises = trueValueKeys.map(async trueGame => {
            const imagePath = path.join(__dirname, '../../../../../register/emoji/wave_' + trueGame + '.png');
            if (fs.existsSync(imagePath) && !filterEmoji.includes(trueGame)) {
                try {
                    await guild.emojis.create({
                        attachment: imagePath,
                        name: 'wave_' + trueGame
                    });
                    console.log('이모지가 서버에 추가되었습니다: wave_' + trueGame);
                } catch (error) {
                    console.error(`이모지 등록 실패: wave_${trueGame}`, error);
                }
            }
        });

        // 모든 이모지 등록 작업 실행
        await Promise.all(emojiPromises);

    } catch (error) {
        console.error('emojiRegister.js 에러 : ', error);
    };
};

module.exports = emojiRegister;