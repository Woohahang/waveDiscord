class EmojiSettings {
    static emojiMaps = {}; // 길드별 이모지를 저장하기 위한 객체
    static emojiTimers = {}; // 길드별 타이머를 저장하기 위한 객체
    static THREE_HOURS_IN_MS = 3 * 60 * 60 * 1000; // 3시간을 밀리초로 변환

    constructor(guildId) {
        this.guildId = guildId;
    };

    getEmojiMap() {
        if (EmojiSettings.emojiMaps[this.guildId]) {

            // 타이머 초기화
            this.resetTimer();

            return EmojiSettings.emojiMaps[this.guildId];
        };

        return null;
    };

    setEmojiMap(emojiMap) {
        EmojiSettings.emojiMaps[this.guildId] = emojiMap;

        // 타이머 초기화
        this.resetTimer();
    };

    resetTimer() {
        // 기존 타이머가 있으면 제거
        if (EmojiSettings.emojiTimers[this.guildId]) {
            clearTimeout(EmojiSettings.emojiTimers[this.guildId]);
        }

        // 3시간 후에 이모지 맵 삭제
        EmojiSettings.emojiTimers[this.guildId] = setTimeout(() => {
            this.clearEmojiMap();
        }, EmojiSettings.THREE_HOURS_IN_MS);
    };


    clearEmojiMap() {
        delete EmojiSettings.emojiMaps[this.guildId];
    };

    async loadEmojiMap(guild) {
        try {
            // 길드에 등록된 이모지
            const emojis = await guild.emojis.fetch();

            // 이모지 중에 Wave 이모지만 필터
            const waveEmojis = emojis.filter(emoji => emoji.name.split('_')[0] === 'wave')
                .map(emoji => ({ name: emoji.name, id: emoji.id }));

            // 길드 id를 키로 캐시 저장
            this.setEmojiMap(waveEmojis);

            return waveEmojis;
        } catch (error) {
            console.error('EmojiSettings.loadEmojiMap error:', error);
            return null;
        };
    };

    async loadOrCreate(guild) {
        // 캐시에서 이모지 맵을 가져오거나 없을 경우 새로 로드
        let emojiMap = this.getEmojiMap();
        if (!emojiMap) {
            emojiMap = await this.loadEmojiMap(guild);
        }
        return emojiMap;
    };
}

module.exports = EmojiSettings;
