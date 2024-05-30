

class EmojiSettings {
    constructor(guildId) {
        if (typeof guildId !== 'string' || guildId.trim() === '') {
            throw new Error('유효하지 않은 guildId입니다.');
        };

        // 싱글톤 패턴
        if (!EmojiSettings.instances[guildId]) {
            this.guildId = guildId;
            this.emoji = { emojiName: null, emojiId: null };
            EmojiSettings.instances[guildId] = this;

            // 타이머 설정
            this.#resetTimer(guildId);
        } else {
            // 이미 인스턴스가 존재한다면 타이머만 리셋
            EmojiSettings.instances[guildId].#resetTimer(guildId);
        };
        return EmojiSettings.instances[guildId];
    };

    #resetTimer(guildId) {
        // 기존 타이머가 있다면 취소
        if (this.timeout) {
            clearTimeout(this.timeout);
        }

        // 새 타이머 설정
        this.timeout = setTimeout(() => {
            // 타이머가 완료되면 인스턴스 삭제
            if (EmojiSettings.instances[guildId]) {
                delete EmojiSettings.instances[guildId];
            } else {
                console.error('인스턴스 삭제 실패: 인스턴스가 이미 존재하지 않습니다.');
            }
        }, 3_600_000); // 한시간
    };

    load(guild) {

        if (!this.emoji) {
            // 서버에 등록된 모든 이모지를 가져옵니다.
            const serverEmojis = guild.emojis.cache;

            // emojiNames 배열에 정의된 이름을 가진 이모지를 찾습니다.
            const foundEmojis = emojiNames.map(name => serverEmojis.find(emoji => emoji.name === name)).filter(emoji => emoji);

            // 찾은 이모지의 이름과 ID를 this.emoji에 저장합니다.
            this.emoji = foundEmojis.map(emoji => ({
                emojiName: emoji.name,
                emojiId: emoji.id
            }));

        };



        return this.emoji;

    };


};


EmojiSettings.instances = {};

module.exports = EmojiSettings;