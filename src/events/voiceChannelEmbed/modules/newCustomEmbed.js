// newCustomEmbed.js

const { emojiNames } = require('../../../module/server/emojiNames');

module.exports = async (newState) => {

    // // 서버에 등록된 모든 이모지를 가져옵니다.
    // const serverEmojis = newState.guild.emojis.cache;

    // // emojiNames 배열에 정의된 이름을 가진 이모지를 찾습니다.
    // const foundEmojis = emojiNames.map(name => serverEmojis.find(emoji => emoji.name === name)).filter(emoji => emoji);

    // // 찾은 이모지의 이름과 ID를 출력합니다.
    // foundEmojis.forEach(emoji => {
    //     console.log(`이름: ${emoji.name}, ID: ${emoji.id}`);
    // });





};



/* 목적 : 이모지 id 구하기

  이모지 이름과 동일한 id를 서버에서 찾기.

  방법 1.
  이모지 이름을 미리 선언하기
  장점 : 연산이 줄어든다.
  단점 : 유지 보수가 귀찮다.

  방법 2.
  절대경로의 폴더 안에 모든 파일의 이름을 가지고 오기
  장점 : 유지 보수가 쉽다.
  단점 : 연산이 길어진다.


  */