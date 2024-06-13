// saveAliasTemplate.js

const { getState, setState } = require('../aliasModules/state');

module.exports = async (interaction) => {

    const state = getState();

    console.log(state);

    console.log('선택한 닉네임 양식들 : ');
    console.log('문단을 나누는 기준 : ');


    // DB에 저장하기
};