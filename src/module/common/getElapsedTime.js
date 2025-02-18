/**
 * 주어진 시작 시간(startTime)으로부터 경과된 시간을 계산하여 
 * 문자열 형태로 반환하는 함수입니다.
 *
 * @param {Date} startTime - 경과 시간을 계산할 기준이 되는 시작 시간.
 * @returns {string} - 경과된 시간을 'Xd Xh Ym Zs' 형태로 반환합니다.
 */
function getElapsedTime(startTime) {
    try {
        const now = new Date();
        const elapsedMilliseconds = now - startTime;

        // 경과된 시간을 밀리초에서 일, 시, 분, 초로 변환
        const seconds = Math.floor(elapsedMilliseconds / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);

        // 남은 시간 계산
        const remainingHours = hours % 24;
        const remainingMinutes = minutes % 60;
        const remainingSeconds = seconds % 60;

        // 경과 시간을 'Xd Xh Ym Zs' 형태로 반환합니다.
        return `${days}d ${remainingHours}h ${remainingMinutes}m ${remainingSeconds}s`;

    } catch (error) {
        throw error;
    }
};

module.exports = getElapsedTime;
