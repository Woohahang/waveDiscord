// checkAdminPermissionOn.js

const { clientId } = require('../../../config.json');
const { PermissionsBitField } = require('discord.js');

// Wave 가 관리자 권한을 받았는지 discord api로 확인
async function checkGuildAdmin(guild) {
    try {
        const wave = await guild.members.fetch(clientId);
        return checkAdmin(wave);
    } catch (error) {
        console.error('checkGuildAdmin 에러:', error);
        return false;
    };
};

// Wave 가 관리자 권한 받았는지 캐시에서 확인
function checkInteractionAdmin(interaction) {
    const wave = interaction.guild.members.cache.get(clientId);
    return checkAdmin(wave);
};

// Wave 가 관리자 권한 받았는지 캐시에서 확인
function checkVoiceAdmin(state) {
    const wave = state.guild.members.cache.get(clientId);
    return checkAdmin(wave);
};


function checkAdmin(wave) {
    return wave ? wave.permissions.has(PermissionsBitField.Flags.Administrator) : false;
};

module.exports = { checkGuildAdmin, checkInteractionAdmin, checkVoiceAdmin };

/*
api 확인 : Wave가 서버에 초대 받았을 때 관리자 권한을 받았는지 느리더라도 정확하게 확인하기 위해

캐시 확인 : 사용자들이 음성 채널 입장할 때, 또는 기타 상호작용을 함에 있어 api로 체크하기에는 느리다.
*/