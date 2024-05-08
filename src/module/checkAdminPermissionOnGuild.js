const { clientId } = require('../../../config.json');


// 용도 : 길드 채널 생성시 Wave가 관리자 권한을 받았는지 체크하기 위함
function checkAdminPermissionOnGuild(guild) {
    const wave = guild.members.cache.get(clientId); // wave 객체

    // 아래 bitfield 의 값은 관리자를 뜻한다. -> 관리자라면 true, 아니라면 false
    return wave.permissions.has(1096185279794761n); // 객체에 관리자 권한이 있는지 체크
};

function checkAdminPermissionOnVoice(newState) {
    const wave = newState.guild.members.cache.get(clientId);

    return wave.permissions.has(1096185279794761n);
};

module.exports = { checkAdminPermissionOnGuild, checkAdminPermissionOnVoice };
