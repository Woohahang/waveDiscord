const { ActionRowBuilder, ButtonBuilder, ButtonStyle, StringSelectMenuBuilder, StringSelectMenuOptionBuilder } = require('discord.js');

const { gameMenuLoader } = require('../module/gameMenuLoader.js');

// 클릭 이벤트를 처리하는 클라이언트에 적용될 코드

function waveButton() {
    // const search = new ButtonBuilder()
    //     .setCustomId('userSearch')
    //     .setLabel('유저 검색')
    //     .setStyle(ButtonStyle.Primary)
    //     .setDisabled(true);

    const remove = new ButtonBuilder()
        .setCustomId('removeButton')
        .setLabel('닉네임 삭제')
        .setStyle(ButtonStyle.Primary)

    const waveLink = new ButtonBuilder()
        .setLabel('Wave 초대하기')
        .setURL('https://discord.com/oauth2/authorize?client_id=1227561479801409566&permissions=8&scope=bot+applications.commands')
        .setStyle(ButtonStyle.Link);

    const row = new ActionRowBuilder()
        .addComponents(remove, waveLink);

    return row;
}

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

    // 채널 내용
    await channel.send({ components: [waveButton()] });
};