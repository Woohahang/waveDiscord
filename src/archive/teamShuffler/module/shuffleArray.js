// // shuffleArray.js

// // 배열의 순서를 랜덤으로 섞기
// function shuffleArray(array) {
//     try {
//         for (let i = array.length - 1; i > 0; i--) {
//             const j = Math.floor(Math.random() * (i + 1));
//             [array[i], array[j]] = [array[j], array[i]]; // ES6 구조 분해 할당을 사용하여 요소를 교환
//         };
//     }
//     catch (error) {
//         console.error('shuffleArray' + error);
//     }
//     return array;
// };

// module.exports = { shuffleArray };