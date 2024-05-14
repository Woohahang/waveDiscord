// teamShufflerHandler.js

const { EmbedBuilder } = require('discord.js');
const { shuffleArray } = require('../../../module/common/shuffleArray');
const { teamEmbedDeleteButton } = require('./teamEmbedDeleteButton');

const MAX_TEAM_COUNT = 15;
const EMBED_COLOR = 0x1E90FF;
const TEAM_EMOJIS = ['🔵', '🔴', '🟢', '🟡', '🟣', '🟠', '⚪'];

// values 안에는 ['팀 수_유저id', '팀 수_유저id', '팀 수_유저id']; 이렇게 담겨 있다.
async function teamShufflerHandler(interaction, values) {
    try {

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
            };

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

        // 모든 인원을 제외 했다면 return
        if (memberInfoList.length === 0) {
            return await interaction.update({
                content: '모든 인원이 제외되어 처리할 수 있는 멤버가 없습니다.',
                components: [],
                ephemeral: true
            });
        };

        // 만약에 팀 수가 너무 높으면 15로 정하기
        teamCount = Math.min(teamCount, MAX_TEAM_COUNT);

        // 만약 팀 수가 memberInfoList의 길이보다 크면, memberInfoList의 길이로 조정
        if (teamCount > memberInfoList.length) {
            teamCount = memberInfoList.length;
        };

        // 순서 랜덤으로 섞기
        shuffleArray(memberInfoList);

        // 팀 나누기
        const teams = [];
        for (let i = 0; i < teamCount; i++) {
            teams.push([]);
        };

        memberInfoList.forEach((member, index) => {
            teams[index % teamCount].push(member);
        });

        // 임베드 구성
        const embed = new EmbedBuilder()
            .setColor(EMBED_COLOR)
            .setTitle('🌟 팀 나누기 결과 🌟')
            .setDescription('**아래는 랜덤으로 나눈 팀 구성입니다.**');

        teams.forEach((team, index) => {

            const teamEmoji = TEAM_EMOJIS[index % TEAM_EMOJIS.length];

            if ((index % 2) === 0) {
                embed.addFields({ name: `${teamEmoji}  ${index + 1}팀`, value: team.join('\n'), inline: true });
                embed.addFields({ name: ' ', value: ' ', inline: true });

            } else {
                embed.addFields({ name: `${teamEmoji}  ${index + 1}팀`, value: team.join('\n'), inline: true });

            };

        });
        embed.addFields({ name: '\u200B', value: '\u200B' });
        embed.setFooter({ text: '행운을 빕니다 !', iconURL: interaction.member.displayAvatarURL() });

        const sentMessage = await voiceChannel.send({
            embeds: [embed],
            components: [teamEmbedDeleteButton()]
        });

        await interaction.update({
            content: '팀 구성이 완료 됐습니다 !',
            components: [],
            ephemeral: true
        });

        // 5초 뒤 삭제 버튼 활성화
        setTimeout(async () => {
            // 버튼을 활성화 상태로 업데이트
            const updatedRow = teamEmbedDeleteButton(false); // false를 전달하여 버튼을 활성화
            await sentMessage.edit({
                embeds: [embed], // embed 변수는 여전히 유효한 범위 내에 있어야 합니다.
                components: [updatedRow]
            });
        }, 5000);


    } catch (error) {
        console.error('teamShufflerHandler.js' + error);
    };

};

module.exports = { teamShufflerHandler };

