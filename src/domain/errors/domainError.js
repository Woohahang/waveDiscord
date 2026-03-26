/**
 * 도메인 계층의 모든 에러의 부모 클래스
 *
 * - 비즈니스 규칙 위반을 표현하기 위한 에러
 * - 인프라/프레젠테이션 계층과 분리됨
 */
class DomainError extends Error {
    /**
     * @param {string} message - 에러 메시지
     * @param {Object} [options]
     * @param {string} [options.code] - 도메인 에러 코드 (선택)
     */
    constructor(message, options = {}) {
        super(message);

        this.name = this.constructor.name;

        // 선택적으로 코드 포함 (유스케이스에서 매핑할 때 사용 가능)
        this.code = options.code ?? null;

        // 디버깅용 (Node.js stack 깔끔하게 유지)
        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = DomainError;