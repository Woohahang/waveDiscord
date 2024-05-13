// teamShufflerHandler.js

const { EmbedBuilder } = require('discord.js');

// 배열 순서 랜덤으로 섞기
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // ES6 구조 분해 할당을 사용하여 요소를 교환
    };
};

async function teamShufflerHandler(interaction, values) {

    let teamCount = 0;
    const excludedUserIds = [];

    // values 배열을 반복하여 각 요소에서 정보를 추출합니다.
    values.forEach(value => {
        // 현재 요소를 '_' 기준으로 분리합니다.
        const [currentTeamCountStr, userId] = value.split('_');

        // 팀의 수를 정수로 변환합니다.
        const currentTeamCount = parseInt(currentTeamCountStr, 10);

        // 팀의 수를 업데이트합니다. (모든 요소에서 팀의 수는 같아야 합니다.)
        if (teamCount === 0) {
            teamCount = currentTeamCount;
        } else if (teamCount !== currentTeamCount) {
            console.warn("경고: 일관되지 않은 팀의 수가 감지되었습니다.");
        }

        // 제외할 사용자 ID를 배열에 추가합니다.
        excludedUserIds.push(userId);
    });

    console.log("팀 수:", teamCount);
    console.log("제외할 사용자 ID:", excludedUserIds);

    const voiceChannel = interaction.member.voice.channel;
    if (!voiceChannel) {
        await interaction.followUp({ content: '음성 채널에 있어야 이 기능을 사용할 수 있습니다.', ephemeral: true });
        return;
    };

    const memberInfoList = [];

    const members = voiceChannel.members;

    // 제외 된 인원을 제외하고 배열에 저장하기
    members.forEach(member => {
        if (excludedUserIds.includes(member.user.id)) return;
        memberInfoList.push(`${member.nickname ? member.nickname : member.user.globalName}(${member.user.username})`);
    });

    // 순서 랜덤으로 섞기
    shuffleArray(memberInfoList);


    // 팀 나누기
    let teams = [];
    for (let i = 0; i < teamCount; i++) {
        teams.push([]);
    };

    memberInfoList.forEach((member, index) => {
        teams[index % teamCount].push(member);
    });

    // 임베드 구성
    const embed = new EmbedBuilder()
        .setColor(0x1E90FF)
        .setTitle('🌟 팀 나누기 결과 🌟')
        .setDescription('**아래는 랜덤으로 나눈 팀 구성입니다.**');

    teams.forEach((team, index) => {
        embed.addFields({ name: `🔵 ${index + 1}팀`, value: team.join('\n'), inline: true });


        if (index === 0) {
            console.log(index);
            console.log('들어올텐데?');
            embed.addFields({ name: '공백', value: '공백', inline: true });
        }

    });
    embed.addFields({ name: '마지막줄', value: '마지막줄' });
    embed.addFields({ name: '마지막줄', value: '마지막줄' });

    embed.setFooter({ text: '행운을 빕니다 ! ――――――⭐', iconURL: interaction.member.displayAvatarURL() });

    await voiceChannel.send({ embeds: [embed] });


    await interaction.update({
        content: '팀 구성이 완료 됐습니다 !',
        components: [],
        ephemeral: true
    });


};

module.exports = { teamShufflerHandler };












// 임베드
// const embedtest = new EmbedBuilder()
//     .setColor(0x1E90FF)
//     .setTitle('🌟 팀 나누기 결과 🌟')
//     .setDescription('** 아래는 랜덤으로 나눈 팀 구성입니다. **')
//     .addFields(
//         { name: '🔵 1팀', value: '현우\n도윤\n강현', inline: true },
//         { name: ' ', value: ' ' },
//         { name: '🔴 2팀', value: '태형\n소연\n대선', inline: true },
//         { name: '🟡 3팀', value: '현우\n도윤\n강현', inline: true },
//         { name: ' ', value: ' ' },
//         { name: '🟢 4팀', value: '태형\n소연\n대선', inline: true },
//         { name: '🟢 5팀', value: '태형\n소연\n대선', inline: true },
//         { name: ' ', value: ' ' },
//         { name: '🟢 6팀', value: '태형\n소연\n대선', inline: true },
//         { name: '🟢 7팀', value: '태형\n소연\n대선', inline: true },
//         { name: ' ', value: ' ' },
//     )
//     .setFooter({ text: '행운을 빕니다 ! ――――――⭐', iconURL: interaction.member.displayAvatarURL() }); // 푸터 메시지 변경