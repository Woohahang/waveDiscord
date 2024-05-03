function checkAdminPermissionOnGuild(clientId, guild) {
    const waveId = clientId; // wave id
    const wave = guild.members.cache.get(waveId); // wave 객체

    // 아래 bitfield 의 값은 관리자를 뜻한다. -> 관리자라면 true, 아니라면 false
    return wave.permissions.has(1096185279794761n); // 객체에 관리자 권한이 있는지 체크
}

function checkAdminPermissionOnVoice(clientId, newState) {
    const waveId = clientId;
    const wave = newState.guild.members.cache.get(waveId);

    return wave.permissions.has(1096185279794761n);
}

module.exports = { checkAdminPermissionOnGuild, checkAdminPermissionOnVoice }