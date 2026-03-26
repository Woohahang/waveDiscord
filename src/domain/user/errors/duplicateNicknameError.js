const DomainError = require('@domain/errors/domainError');

/**
 * 동일 게임 내 닉네임 중복 시 발생하는 도메인 에러
 */
class DuplicateNicknameError extends DomainError {
    /**
     * @param {Object} params
     * @param {string} params.gameType
     * @param {string} params.nickname
     */
    constructor({ gameType, nickname }) {
        super(
            `[DuplicateNicknameError] duplicate nickname. gameType: '${gameType}', nickname: '${nickname}'`
        );

        this.gameType = gameType;
        this.nickname = nickname;
    }
}

module.exports = DuplicateNicknameError;