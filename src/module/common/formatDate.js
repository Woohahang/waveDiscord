/**
 * 주어진 날짜를 'YYYY년 MM월 DD일 HH시 mm분' 형식으로 포맷하는 함수입니다.
 *
 * @param {Date} date - 포맷할 날짜.
 * @returns {string} - 포맷된 날짜 문자열.
 */
function formatDate(date) {
    try {
        // 한국 표준시 (KST)로 변환하기 위해 9시간 더함
        const year = date.getFullYear(); // 연도
        const month = String(date.getMonth() + 1).padStart(2, '0'); // 월 (0부터 시작하므로 +1)
        const day = String(date.getDate()).padStart(2, '0'); // 일
        const hours = String(date.getHours()).padStart(2, '0'); // 시
        const minutes = String(date.getMinutes()).padStart(2, '0'); // 분

        return `${year}, ${month}, ${day}  ${hours}:${minutes}`; // 포맷된 문자열 반환
    } catch (error) {
        throw error;
    };
};

module.exports = formatDate;