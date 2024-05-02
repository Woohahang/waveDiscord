const { EmbedBuilder } = require('discord.js');
const userSchema = require('../models/userSchema.js');
const { clientId } = require('../../../config.json');

// 모든 공백을 제거하고 반환
function removeSpaces(inputString) {
    return inputString.replace(/ /g, '');
}

function createFields(userDocument) {
    const fields = [];

    // 스팀
    let steamNickNames = '';
    if (userDocument.steam.length > 0) {
        userDocument.steam.forEach(nickname => {
            steamNickNames += `${nickname}\n`;
        });

        fields.push({ name: 'Steam', value: steamNickNames });
    }

    // 라이엇
    let riotGamesNickNames = '';
    if (userDocument.riotGames.length > 0) {
        userDocument.riotGames.forEach(nickname => {
            if (nickname && !nickname.includes('#')) {
                nickname += '#KR1';
            }
            riotGamesNickNames += `[${nickname}](https://dak.gg/pubg/profile/kakao/${removeSpaces(nickname)})\n`;
        });

        fields.push({ name: '라이엇 게임즈', value: riotGamesNickNames });
    }

    // 카카오
    let kakaonicknames = '';
    if (userDocument.kakao.length > 0) {
        userDocument.kakao.forEach(nickname => {
            kakaonicknames += `[${nickname}](https://dak.gg/pubg/profile/kakao/${removeSpaces(nickname)})\n`;
        });

        fields.push({ name: '카카오 배틀 그라운드', value: kakaonicknames });
    }

    return fields;
}

module.exports = async (oldState, newState) => {
    try {
        if (oldState.channelId !== newState.channelId && newState.channelId !== null) {
            const user = newState.member.user;
            const channel = newState.channel;
            const userDocument = await userSchema.findOne({ userId: newState.id });

            if (!userDocument) { console.log("사용자 문서를 찾을 수 없습니다."); return };

            const embed = new EmbedBuilder()
                .setColor('#0099ff')
                .setColor(0x0099FF)
                .setAuthor({ name: user.globalName, iconURL: user.displayAvatarURL(), url: user.avatarURL() })
                .addFields(createFields(userDocument))
                .setTimestamp(new Date(userDocument.updatedAt))
                .setFooter({ text: '━━━━━━━━━━━ update', iconURL: 'https://cdn-icons-png.flaticon.com/512/5052/5052710.png' });

            // 중복 임베드 삭제
            const messages = await channel.messages.fetch({ limit: 10 });

            const filterEmbeds = messages.filter(message => message.author.id === clientId && message.embeds.length > 0);

            filterEmbeds.forEach(message => {
                message.embeds.forEach(embed => {
                    if (embed.author.name == user.globalName && embed.author.url == user.avatarURL() && embed.author.iconURL == user.displayAvatarURL()) {
                        if (message) {
                            message.delete();
                        } else {
                            console.log("삭제할 메시지를 찾을 수 없습니다. / 간혹 API 문제");
                        }
                    }
                });
            });

            // 닉네임이 없다면 임베드를 안 보낸다.
            if (createFields(userDocument).length <= 0) return;

            await channel.send({ embeds: [embed] });

        }
    } catch (error) {
        console.error("오류가 발생했습니다:", error);
    }
}
