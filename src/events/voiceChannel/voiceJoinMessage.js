const { EmbedBuilder } = require('discord.js');
const { clientId } = require('../../../../config.json');
const userSchema = require('../../mongoDB/userSchema.js');
const guildSettingsSchema = require('../../mongoDB/guildSettingsSchema.js');


// 모든 공백을 제거하고 반환
function removeSpaces(inputString) {
    return inputString.replace(/ /g, '');
};

async function createFields(userDocument, targetGuildId) {
    const fields = [];

    const guildSettings = await guildSettingsSchema.findOne({ guildId: targetGuildId });

    // 스팀
    let steamNickNames = '';
    if (guildSettings.steam && userDocument.steam.length > 0) {
        let includesSteamCommunity;
        userDocument.steam.forEach(nickname => {
            includesSteamCommunity = nickname.includes("https://steamcommunity.com/");
            steamNickNames += `${nickname}\n`;
        });

        fields.push({ name: 'Steam', value: includesSteamCommunity ? `[스팀 친구 추가](${removeSpaces(steamNickNames)})` : steamNickNames });
    };

    // 라이엇
    let riotGamesNickNames = '';
    if (guildSettings.riotGames && userDocument.riotGames.length > 0) {
        userDocument.riotGames.forEach(nickname => {
            if (nickname && !nickname.includes('#')) {
                nickname += '#KR1';
            }
            riotGamesNickNames += `[${nickname}](https://www.op.gg/summoners/kr/${removeSpaces(nickname)})\n`;
        });

        fields.push({ name: '라이엇 게임즈', value: riotGamesNickNames });
    };

    // 스팀 배그
    let steamBGNicknames = '';
    if (guildSettings.steamBG && userDocument.steamBG.length > 0) {
        userDocument.steamBG.forEach(nickname => {
            steamBGNicknames += `[${nickname}](https://pubg.op.gg/user/${removeSpaces(nickname)})\n`;
        });

        fields.push({ name: '스팀 배틀 그라운드', value: steamBGNicknames });
    };

    // 카카오
    let kakaonicknames = '';
    if (guildSettings.kakaoBG && userDocument.kakao.length > 0) {
        userDocument.kakao.forEach(nickname => {
            kakaonicknames += `[${nickname}](https://dak.gg/pubg/profile/kakao/${removeSpaces(nickname)})\n`;
        });

        fields.push({ name: '카카오 배틀 그라운드', value: kakaonicknames });
    };

    // 오버워치 2
    let overWatchTwoNicknames = '';
    if (guildSettings.overWatchTwo && userDocument.overWatchTwo.length > 0) {
        userDocument.overWatchTwo.forEach(nickname => {
            overWatchTwoNicknames += `${nickname}\n`;
        });

        fields.push({ name: '오버워치 2', value: overWatchTwoNicknames });
    };

    return fields;
};

async function voiceJoin(newState) {
    try {
        if (!newState.channelId) return;

        const user = newState.member.user;
        const channel = newState.channel;
        const targetGuildId = newState.guild.id;

        // 유저 닉네임 조회
        const userDocument = await userSchema.findOne({ userId: newState.id });
        if (!userDocument) return;

        // 유저 닉네임 양식에 맞게 가공
        const fields = await createFields(userDocument, targetGuildId);
        if (fields.length <= 0) return;

        const embed = new EmbedBuilder()
            .setColor('#0099ff')
            .setColor(0x0099FF)
            .setAuthor({ name: user.globalName, iconURL: user.displayAvatarURL(), url: user.avatarURL() })
            .addFields(fields)
            .setTimestamp(new Date(userDocument.updatedAt))
            .setFooter({ text: '━━━━━━━━━━━ update', iconURL: 'https://cdn-icons-png.flaticon.com/512/5052/5052710.png' });

        // 메시지 전송
        const sentMessage = await channel.send({ embeds: [embed] });
        return sentMessage.id;

    } catch (error) {
        console.error("오류가 발생했습니다:", error);
    };
};

module.exports = { voiceJoin };

// // 채널의 최근 메시지 20개 가지고 오기
// const messages = await channel.messages.fetch({ limit: 20 });
// // 내가 보낸 Embed 만 가지고 오기
// const filterEmbeds = messages.filter(message => message.author.id === clientId && message.embeds.length > 0);

// // 사용자의 중복 임베드만 삭제하기
// filterEmbeds.forEach(message => {
//     message.embeds.forEach(embed => {
//         if (embed.author?.name == user.globalName && embed.author?.url == user.avatarURL() && embed.author?.iconURL == user.displayAvatarURL()) {
//             if (message) {
//                 message.delete();
//             } else {
//                 console.log("삭제할 메시지를 찾을 수 없습니다. / 간혹 API 문제");
//             }
//         }
//     });
// });