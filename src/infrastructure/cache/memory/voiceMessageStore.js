/**
 * 음성 프로필 메시지 추적용 메모리 저장소
 *
 * guildId + userId 기준으로
 * 전송한 메시지의 channelId, messageId를 저장합니다.
 */
class VoiceMessageStore {
    constructor() {
        this.store = new Map();
    }

    /**
     * 저장 키를 생성합니다.
     *
     * @param {string} guildId
     * @param {string} userId
     * @returns {string}
     */
    #makeKey(guildId, userId) {
        return `${guildId}:${userId}`;
    }

    /**
     * 메시지 정보를 저장합니다.
     *
     * @param {Object} params
     * @param {string} params.guildId
     * @param {string} params.userId
     * @param {string} params.channelId
     * @param {string} params.messageId
     * @returns {void}
     */
    save({ guildId, userId, channelId, messageId }) {
        const key = this.#makeKey(guildId, userId);

        this.store.set(key, {
            channelId,
            messageId,
        });
    }

    /**
     * 메시지 정보를 조회합니다.
     *
     * @param {string} guildId
     * @param {string} userId
     * @returns {{channelId: string, messageId: string}|null}
     */
    find(guildId, userId) {
        const key = this.#makeKey(guildId, userId);
        return this.store.get(key) ?? null;
    }

    /**
     * 메시지 정보를 삭제합니다.
     *
     * @param {string} guildId
     * @param {string} userId
     * @returns {boolean}
     */
    delete(guildId, userId) {
        const key = this.#makeKey(guildId, userId);
        return this.store.delete(key);
    }

    /**
     * 전체 데이터를 비웁니다.
     *
     * @returns {void}
     */
    clear() {
        this.store.clear();
    }
}

module.exports = VoiceMessageStore;