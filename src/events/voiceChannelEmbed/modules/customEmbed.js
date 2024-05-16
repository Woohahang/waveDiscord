const { EmbedBuilder } = require('discord.js');

// 모든 공백을 제거하고 반환
function removeSpaces(inputString) {
    return inputString.replace(/ /g, '');
};

function loLCustom(nickname) {
    nickname = nickname.replace(/ /g, '%20');
    nickname = nickname.replace(/#/g, '-');

    return nickname;
};

async function createFields(userData, guildSettings) {
    const fields = [];

    // 스팀
    let steamNickNames = '';
    if (guildSettings.steam && userData.steam.length > 0) {
        let includesSteamCommunity;
        userData.steam.forEach(nickname => {
            includesSteamCommunity = nickname.includes("https://steamcommunity.com/");
            steamNickNames += `${nickname}\n`;
        });

        fields.push({ name: 'Steam', value: includesSteamCommunity ? `[스팀 친구 추가](${removeSpaces(steamNickNames)})` : steamNickNames });
    };

    // 리그 오브 레전드
    let loLNickNames = '';
    if (guildSettings.loL && userData.loL.length > 0) {
        userData.loL.forEach(nickname => {
            if (nickname && !nickname.includes('#')) {
                nickname += '#KR1';
            };
            loLNickNames += `[${nickname}](https://www.op.gg/summoners/kr/${loLCustom(nickname)})\n`;
        });
        fields.push({ name: '리그 오브 레전드', value: loLNickNames });
    };

    // 롤토체스
    let tfTNickNames = '';
    if (guildSettings.tfT && userData.tfT.length > 0) {
        userData.tfT.forEach(nickname => {
            if (nickname && !nickname.includes('#')) {
                nickname += '#KR1';
            };
            tfTNickNames += `[${nickname}](https://lolchess.gg/profile/kr/${loLCustom(nickname)})\n`;
        });

        fields.push({ name: '롤토체스', value: tfTNickNames });
    };

    // 스팀 배그
    let steamBGNicknames = '';
    if (guildSettings.steamBG && userData.steamBG.length > 0) {
        userData.steamBG.forEach(nickname => {
            steamBGNicknames += `[${nickname}](https://pubg.op.gg/user/${removeSpaces(nickname)})\n`;
        });

        fields.push({ name: '스팀 배틀 그라운드', value: steamBGNicknames });
    };

    // 카카오
    let kakaonicknames = '';
    if (guildSettings.kakaoBG && userData.kakao.length > 0) {
        userData.kakao.forEach(nickname => {
            kakaonicknames += `[${nickname}](https://dak.gg/pubg/profile/kakao/${removeSpaces(nickname)})\n`;
        });

        fields.push({ name: '카카오 배틀 그라운드', value: kakaonicknames });
    };

    // 오버워치 2
    let overWatchTwoNicknames = '';
    if (guildSettings.overWatchTwo && userData.overWatchTwo.length > 0) {
        userData.overWatchTwo.forEach(nickname => {
            overWatchTwoNicknames += `${nickname}\n`;
        });

        fields.push({ name: '오버워치 2', value: overWatchTwoNicknames });
    };

    return fields;
};

// 메시지 전송 모듈
function customEmbed(member, fields, updatedAt) {

    const displayName = member.nickname ? member.nickname : member.user.globalName;

    const embed = new EmbedBuilder()
        .setColor('#0099ff')
        .setColor(0x0099FF)
        .setAuthor({ name: displayName, iconURL: member.user.displayAvatarURL(), url: member.user.avatarURL() })
        .addFields(fields)
        .setTimestamp(new Date(updatedAt))
        .setFooter({ text: '――――――――― update', iconURL: 'https://cdn-icons-png.flaticon.com/512/5052/5052710.png' });

    return embed;
};

module.exports = { createFields, customEmbed };