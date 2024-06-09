// emojiUpdate.js

const GuildSettings = require('../../../services/GuildSettings');
const EmojiSlotError = require('../../../utils/errors/EmojiSlotError');

const filterOptions = require('../../../module/data/filterOptions');
const emojiRegister = require('./module/emojiRegister');
const emojiCapacityCheck = require('./module/emojiCapacityCheck');
const { clientId } = require('../../../../../config.json');


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
                .then(() => console.log('이모지 삭제 : ', emoji.name))
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

        // 이모지 제거
        await emojiDelete(guild, guildEmojis, trueValueKeys);

        // 이모지 슬롯 여유 확인
        const hasSlotsAvailable = emojiCapacityCheck(guild, guildEmojis);
        if (!hasSlotsAvailable) {
            throw new EmojiSlotError('이모지 슬롯 초과');
        };

        // 이모지 등록
        await emojiRegister(guild, guildEmojis, trueValueKeys);

    } catch (error) {

        switch (error.code) {
            case 'EMOJI_SLOT_ERROR': // 슬롯 초과
                throw error;

            default: // 이외의 모든 에러
                console.error('emojiUpdate.js 에러 : ', error);
        };

    };
};