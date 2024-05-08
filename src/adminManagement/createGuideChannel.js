// createGuideChannel.js
const { ActionRowBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder } = require('discord.js');
const guildSettingsSchema = require('../mongoDB/guildSettingsSchema.js');
const { waveButton } = require('../module/adminModules/waveButton.js');


module.exports = async (guild) => {

    // 길드 데이터 생성
    let guildSettingsData = new guildSettingsSchema({ guildId: guild.id });
    await guildSettingsData.save();


    // 길드 초대시 채팅 채널 생성
    const channel = await guild.channels.create({ name: '📘ㆍwave', type: 0 });

    // 채팅 채널 : 메시지 보내기 off
    channel.permissionOverwrites.create(channel.guild.roles.everyone, { SendMessages: false });

    // 채널 내용
    await channel.send({
        content: "## :star: Wave 메인 명령어\n## /닉네임등록  /닉네임삭제",
        components: [await gameMenuLoader(guildSettingsData)],
    });

    await channel.send({ components: [waveButton()] });

};

async function gameMenuLoader(guildSettingsData) {
    try {

        // 각 게임의 가시성 설정을 확인하고, false로 설정된 게임만 메뉴에 추가
        const allGames = [
            { label: 'Steam', description: '스팀 친구 코드 또는 스팀 프로필 주소', value: 'steam', visible: guildSettingsData.steam },
            { label: 'Riot Games', description: '라이엇 게임즈 닉네임', value: 'riotGames', visible: guildSettingsData.riotGames },
            { label: 'Steam Battle Grounds', description: '스팀 배틀 그라운드 닉네임', value: 'steamBG', visible: guildSettingsData.steamBG },
            { label: 'KaKao Battle Grounds', description: '카카오 배틀 그라운드 닉네임', value: 'kaKaoBG', visible: guildSettingsData.kakaoBG },
            { label: 'OVERWATCH 2', description: '오버워치 2', value: 'overWatchTwo', visible: guildSettingsData.overWatchTwo },
        ];

        let gameMenuSelect = new StringSelectMenuBuilder()
            .setCustomId('gameMenu')
            .setPlaceholder('닉네임 등록 !');

        // visible 이 true 인 것만 들고 온다 ( 보이는 것만 들고 온다. )
        const visibleGames = getVisibleGames(allGames);

        visibleGames.forEach(game => {
            gameMenuSelect.addOptions(createGameOption(game));
        });

        let row = new ActionRowBuilder().addComponents(gameMenuSelect);

        return row;

    } catch (error) {
        console.error(error);
    }
}

function getVisibleGames(allGames) {
    return allGames.filter(games => games.visible);
}

function createGameOption(game) {
    return new StringSelectMenuOptionBuilder()
        .setLabel(game.label)
        .setDescription(game.description)
        .setValue(game.value);
}