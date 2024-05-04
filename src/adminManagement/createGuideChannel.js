// createGuideChannel.js

const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

const { gameMenuLoader } = require('../module/gameMenuLoader.js');
const { waveButton } = require('../module/adminModules/waveButton.js');

module.exports = async (guild) => {

    // 채널 이름
    const channel = await guild.channels.create({ name: '📘ㆍwave', type: 0 });

    // 메시지 보내기 off
    channel.permissionOverwrites.create(channel.guild.roles.everyone, { SendMessages: false });

    // 채널 내용
    await channel.send({
        content: "## :star: Wave 메인 명령어\n## /닉네임등록  /닉네임삭제",
        components: [await gameMenuLoader()],
    });

    await channel.send({ components: [waveButton()] });

};


/*
 components: [await gameMenuLoader(), waveButton()] 에서 await 을 쓰는 이유 ( 없으면 에러 )

 gameMenuLoader 안에 StringSelectMenuBuilder 가 비동기 함수다. 요청을 받으면 작동 되는 함수
*/