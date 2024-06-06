// emojiRegistrar.js

const fs = require('fs');
const path = require('path');
const { emojiNames } = require('../../../module/server/emojiNames');

// 디스코드 서버에 여러 이모지 등록하기
module.exports = async (guild) => {
    try {

        // 각 이모지에 대해 반복
        console.log('이모지 생성 시도');

        for (const emojiName of emojiNames) {

            // 이모지 파일 경로
            const imagePath = path.join(__dirname, '../../../../register/emoji/', `${emojiName}.png`);

            // 이미 같은 이름의 이모지가 존재하는지 검사
            const existingEmoji = guild.emojis.cache.find(emoji => emoji.name === emojiName);

            // 같은 이름의 이모지가 없을 때만 등록 진행
            if (!existingEmoji) {
                // 파일을 버퍼로 읽기
                const image = fs.readFileSync(imagePath);

                // 이모지 등록
                await guild.emojis.create({
                    attachment: image,
                    name: emojiName,
                });

                console.log(`${emojiName} 이모지가 성공적으로 등록되었습니다!`);

            } else {
                console.log(`${emojiName} 이모지는 이미 서버에 존재합니다.`);
            };

        };

    } catch (error) {
        console.error(`${emojiName} 이모지를 등록하는 데 실패했습니다:`, error);
    };
};