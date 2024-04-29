// src/events/voiceJoinMessage.js

const { EmbedBuilder } = require('discord.js');
const userSchema = require('../models/userSchema.js');
const { clientId } = require('../../../config.json');

async function removeEmptyFields(userDocument) {
    // 게임이 더 확장 되면 필드명 추가
    ['steam', 'kakao', 'riotGames'].forEach(field => {
        if (userDocument[field] === '') {
            userDocument[field] = undefined;
        }
    });

    await userDocument.save();
}

async function addDefaultRiotGames(userDocument) {
    if (userDocument.riotGames && !userDocument.riotGames.includes('#')) {
        userDocument.riotGames += '#KR1';

        await userDocument.save();
    }
}

function removeSpaces(inputString) {
    // 모든 공백을 제거하고 반환
    return inputString.replace(/ /g, '');
}


function createFields(userDocument) {
    const fields = [];

    if (userDocument.steam) {
        // Steam 프로필 주소에 'https://steamcommunity.com/'이 포함되어 있으면, 링크로 표시합니다.
        // - 포함되어 있지 않으면, 친구 코드를 그대로 표시합니다.
        const includesSteamCommunity = userDocument.steam.includes("https://steamcommunity.com/");
        removeSpaces(userDocument.steam);
        fields.push({
            name: 'Steam',
            value: includesSteamCommunity ? `[스팀 친구 추가](${userDocument.steam})` : userDocument.steam,
            inline: false
        });
    }

    if (userDocument.riotGames) {
        let riotGamesLink = userDocument.riotGames;
        fields.push({
            name: '라이엇 게임즈',
            value: `[${userDocument.riotGames}](https://www.op.gg/summoners/kr/${removeSpaces(riotGamesLink)})`,
            inline: false
        });
    }

    if (userDocument.kakao) {
        removeSpaces(userDocument.kakao);
        fields.push({
            name: '카카오 배틀 그라운드',
            value: `[${userDocument.kakao}](https://dak.gg/pubg/profile/kakao/${userDocument.kakao})`,
            inline: false
        });
    }

    return fields;
}

module.exports = async (oldState, newState) => {

    if (oldState.channelId !== newState.channelId && newState.channelId !== null) {
        const user = newState.member.user;
        const userDocument = await userSchema.findOne({ userId: newState.id });
        const channel = newState.channel;

        if (!userDocument) {
            console.log("사용자 문서를 찾을 수 없습니다.");
            return
        };

        try {
            await removeEmptyFields(userDocument);
            await addDefaultRiotGames(userDocument);

            const fields = createFields(userDocument);

            const embed = new EmbedBuilder()
                .setColor('#0099ff')
                .setTitle('사용자 정보')
                .setColor(0x0099FF)
                .setAuthor({ name: user.globalName, iconURL: user.displayAvatarURL(), url: user.avatarURL() })
                .addFields(...fields, { name: '\u200B', value: '\u200B' })
                .setTimestamp(new Date(userDocument.updatedAt))
                .setFooter({ text: '━━━━━━━━━━━ update', iconURL: 'https://cdn-icons-png.flaticon.com/512/5052/5052710.png' });

            // 응답 받은 (음성 채널) 의 메시지 10개를 가지고 옵니다.
            const messages = await channel.messages.fetch({ limit: 10 });

            // wave bot 이 채팅 친 메세지 중에 embed 메세지들을 가지고 옵니다.
            const filterEmbeds = messages.filter(message => message.author.id === clientId && message.embeds.length > 0);

            // 중복된 임베드를 삭제합니다.
            filterEmbeds.forEach(message => {
                message.embeds.forEach(embed => {
                    if (embed.author.name == user.globalName && embed.author.url == user.avatarURL() && embed.author.iconURL == user.displayAvatarURL()) {
                        if (message) {
                            message.delete();
                            console.log("중복 임베드 삭제");
                        } else {
                            console.log("삭제할 메시지를 찾을 수 없습니다. / 간혹 API 문제");
                        }
                    }
                });
            });

            // 임베드 전송
            await channel.send({ embeds: [embed] });

        } catch (error) {
            console.error(`메시지를 보내는 중에 오류가 발생했습니다.! : ${error}`);
        }
    }

}
