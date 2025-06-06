class SteamDto {
    constructor(entries = []) {
        this.entries = entries.map(entry => ({
            nickname: entry.nickname,
            profileLink: entry.profileLink
        }));
    }

    hasNickname() {
        return this.entries.some(entry => !!entry.nickname?.trim());
    }

    getNicknames() {
        return this.entries.map(entry => entry.nickname);
    }

    /**
     * 주어진 닉네임에 대응되는 프로필 링크 반환
     * @param {string} nickname
     * @returns {string|null}
     */
    getProfileLink(nickname) {
        const entry = this.entries.find(entry => entry.nickname === nickname);
        return entry?.profileLink || null;
    }
}

module.exports = SteamDto;