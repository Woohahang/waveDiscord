// emojiUpdate.js

const fs = require('fs');
const path = require('path');

const GuildSettings = require('../../../services/GuildSettings');
const filterOptions = require('../../../module/data/filterOptions');

const { emojiNames } = require('../../../module/server/emojiNames');

// 길드 데이터 중에 false 인 게임은 등록 된 이모지 삭제
module.exports = async (guild) => {
    try {
        // 길드 인스턴스 생성 및 불러오기
        const guildSettings = new GuildSettings(guild.id);
        const guildData = await guildSettings.loadOrCreate();

        // 보이는 게임만 가지고 옵니다.
        const trueValueKeys = filterOptions(guildData, true);

        console.log('trueValueKeys : ', trueValueKeys);
        console.log('emojiNames : ', emojiNames);

        if (!trueValueKeys) return;

        for (const emojiName of trueValueKeys) {
            // 옵셔널 채이닝 생략
            await guild.emojis.cache.find(e => e.name === 'wave_' + emojiName)?.delete()
                .then(() => console.log('wave_' + emojiName + ' 이모지 삭제 완료'));
        };


        return;

        // trueValueKeys에 포함된 이름을 기반으로 emojiNames에서 해당하는 이모지 이름만 필터링
        const filteredEmojiNames = emojiNames.filter(emojiName =>
            trueValueKeys.some(key => emojiName.includes(key))
        );

        console.log('filteredEmojiNames : ', filteredEmojiNames);


        return;

        // // 이모지 이름 필터링
        // const filteredEmojiNames = emojiNames.filter(emojiName => {

        //     // return trueValueKeys.some(key => {
        //     // console.log('key:', key);
        //     // })

        //     // 이모지 이름의 접두사가 trueValueKeys에 있는지 확인
        //     return trueValueKeys.some(key => emojiName.toLowerCase().startsWith(key.toLowerCase()));
        // });

        console.log('filteredEmojiNames : ', filteredEmojiNames);

        for (const emojiName of filteredEmojiNames) {
            // 이모지 파일 경로
            const imagePath = path.join(__dirname, '../../../../register/emoji/', `${emojiName}.png`);

            // 이미 같은 이름의 이모지가 존재하는지 검사
            const existingEmoji = guild.emojis.cache.find(emoji => emoji.name === emojiName);
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


        return;



        // 숨긴 게임만 가지고 옵니다.
        const falseValueKeys = filterOptions(guildData, false);

        // 비동기 처리를 위해 forEach 대신 forof
        for (const gameKey of falseValueKeys) {
            const emoji = guild.emojis.cache.find(emoji => emoji.name === 'wave_' + gameKey);

            if (!emoji) continue; // 이모지가 없다면 다음으로 넘어갑니다.
            console.log(emoji.name, ' 이모지를 삭제했습니다!');
            await emoji.delete(); // await 키워드를 사용하여 비동기 처리
        };

    } catch (error) {
        console.error('emojiUpdate.js 에러 : ', error);
    };
};