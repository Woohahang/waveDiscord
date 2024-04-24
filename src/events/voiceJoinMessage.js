// src/events/voiceJoinMessage.js

function setDefaultValues(userDocument) {  // DB 데이터가 비어 있으면 - 값 적용, 이유 : null 이거나 '' 면 .addFields 의 value가 깨진다.

    userDocument.kakao = userDocument.kakao || '-';
    userDocument.steam = userDocument.steam || '-';
    userDocument.loL = userDocument.loL || '-';

}

const { EmbedBuilder } = require('discord.js');
const userSchema = require('../models/userSchema.js');

module.exports = async (oldState, newState) => {
    // 유저 정보를 데이터베이스에서 가져옵니다.
    const userDocument = await userSchema.findOne({ guildId: newState.guild.id, userId: newState.id });

    // 유저 정보가 없으면 함수를 종료합니다.
    if (!userDocument) return console.log(`사용자의 사용자 프로필을 찾을 수 없습니다. ${newState.id}`);

    // 음성 채널을 가져옵니다.
    let channel;
    try {
        channel = await newState.guild.channels.fetch(newState.channelId);
    } catch (error) {
        console.error(`채널을 가져오는 중에 오류가 발생했습니다. : ${error}`);
        return;
    }

    // 채널이 없으면 함수를 종료합니다.
    if (!channel) return console.log(`사용자의 채널을 찾을 수 없습니다 ${newState.id}`);

    setDefaultValues(userDocument);

    const user = newState.member.user;

    const embedMessage = new EmbedBuilder()
        .setColor('#0099ff')
        .setTitle('사용자 정보')
        .setColor(0x0099FF)
        .setAuthor({ name: user.globalName, iconURL: user.displayAvatarURL(), url: user.avatarURL() })
        .addFields(
            { name: 'Steam 프로필', value: '[스팀 친구 추가](https://steamcommunity.com/profiles/76561198311685982/)', inline: true },
            { name: '카카오 배틀 그라운드', value: `[${userDocument.kakao}](https://dak.gg/pubg/profile/kakao/${userDocument.kakao})`, inline: true },
            { name: ' ', value: ' ' },
            { name: '리그 오브 레전드', value: `[${userDocument.loL}](https://www.op.gg/summoners/kr/${userDocument.loL})`, inline: true },
            { name: '발로란트', value: `[-](https://dak.gg/valorant/profile/)`, inline: true },
            { name: '\u200B', value: '\u200B' }
        )
        .setTimestamp(userSchema.updatedAt)
        .setFooter({ text: '━━━━━━━━━━━ update', iconURL: 'https://cdn-icons-png.flaticon.com/512/5052/5052710.png' });

    // 채널에 메시지를 전송합니다.
    try {
        await channel.send({ embeds: [embedMessage] });
    } catch (error) {
        console.error(`메시지를 보내는 중에 오류가 발생했습니다. : ${error}`);
    }

};


