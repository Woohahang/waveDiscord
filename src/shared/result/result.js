/**
 * @class Result
 * @description 유스케이스의 실행 결과를 표현하는 공통 객체
 */
class Result {
    /**
     * @param {Object} params
     * @param {boolean} params.ok - 성공 여부
     * @param {string|null} [params.code] - 상태 코드
     * @param {any|null} [params.data] - 반환 데이터
     */
    constructor({ ok, code = null, data = null }) {
        this.ok = ok;
        this.code = code;
        this.data = data;
    }

    /**
     * 성공 결과를 생성합니다.
     *
     * @param {Object} [params]
     * @param {string} [params.code]
     * @param {any} [params.data]
     * @returns {Result}
     */
    static ok({ code = null, data = null } = {}) {
        return new Result({
            ok: true,
            code,
            data,
        });
    }

    /**
     * 실패 결과를 생성합니다.
     *
     * @param {Object} params
     * @param {string} params.code
     * @param {any} [params.data]
     * @returns {Result}
     */
    static fail({ code, data = null }) {
        return new Result({
            ok: false,
            code,
            data,
        });
    }

}

module.exports = Result;