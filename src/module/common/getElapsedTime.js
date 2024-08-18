/**
 * 주어진 시작 시간(startTime)으로부터 경과된 시간을 계산하여 
 * 문자열 형태로 반환하는 함수입니다.
 *
 * @param {Date} startTime - 경과 시간을 계산할 기준이 되는 시작 시간.
 * @returns {string} - 경과된 시간을 'Xh Ym Zs' 형태로 반환합니다.
 */
function getElapsedTime(startTime) {
    try {
        const now = new Date();
        const elapsed = new Date(now - startTime);
        const hours = elapsed.getUTCHours();
        const minutes = elapsed.getUTCMinutes();
        const seconds = elapsed.getUTCSeconds();

        // 경과 시간을 'Xh Ym Zs' 형태로 반환합니다.
        return `${hours}h ${minutes}m ${seconds}s`;

    } catch (error) {
        throw error;
    }
};

module.exports = getElapsedTime;