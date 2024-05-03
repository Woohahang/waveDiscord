// createGuideChannel.js

const { ActionRowBuilder, ButtonBuilder, ButtonStyle, StringSelectMenuBuilder, StringSelectMenuOptionBuilder } = require('discord.js');

async function gameMenuLoader() {
    let gameMenuSelect = new StringSelectMenuBuilder()
        .setCustomId('gameMenu')
        .setPlaceholder('닉네임 등록 !')
        .addOptions(
            new StringSelectMenuOptionBuilder()
                .setLabel('Steam')
                .setDescription('스팀 친구 코드 또는 스팀 프로필 주소')
                .setValue('steam'),
            new StringSelectMenuOptionBuilder()
                .setLabel('KaKao Battle Grounds')
                .setDescription('배틀 그라운드 닉네임')
                .setValue('kaKaoBG'),
            new StringSelectMenuOptionBuilder()
                .setLabel('Riot Games')
                .setDescription('라이엇 게임즈 닉네임')
                .setValue('riotGames'),
        );

    let row = new ActionRowBuilder()
        .addComponents(gameMenuSelect);

    return row;

}

function waveButton() {

    const remove = new ButtonBuilder()
        .setCustomId('removeButton')
        .setLabel('닉네임 삭제')
        .setStyle(ButtonStyle.Primary);

    const waveLink = new ButtonBuilder()
        .setLabel('Wave 초대하기')
        .setURL('https://discord.com/oauth2/authorize?client_id=1227561479801409566&permissions=8&scope=bot+applications.commands')
        .setStyle(ButtonStyle.Link);

    const row = new ActionRowBuilder()
        .addComponents(remove, waveLink);

    return row;
};



module.exports = async (guild) => {

    // 채널 이름
    const channel = await guild.channels.create({ name: '📘ㆍwave', type: 0 });

    // 메시지 보내기 off
    channel.permissionOverwrites.create(channel.guild.roles.everyone, { SendMessages: false });

    // 채널 내용
    await channel.send({
        content: "## :star: Wave 메인 명령어\n## /닉네임등록  /닉네임삭제\n\n",
        components: [await gameMenuLoader()],
    });

    await channel.send({ components: [waveButton()] });

};



/*
 components: [await gameMenuLoader(), waveButton()] 에서 await 을 쓰는 이유 ( 없으면 에러 )

 gameMenuLoader 안에 StringSelectMenuBuilder 가 비동기 함수다. 요청을 받으면 작동 되는 함수
*/