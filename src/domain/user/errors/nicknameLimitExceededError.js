const DomainError = require("@domain/errors/domainError");

/**
 * 닉네임 등록 개수 초과 시 발생하는 도메인 에러
 */
class NicknameLimitExceededError extends DomainError {
    /**
     * @param {Object} params
     * @param {string} params.gameType
     * @param {number} params.limit
     */
    constructor({ gameType, limit }) {
        super(
            `[NicknameLimitExceededError] nickname limit exceeded. gameType:'${gameType}', limit:'${limit}'`
        );

        this.gameType = gameType;
        this.limit = limit;
    }
}

module.exports = NicknameLimitExceededError;