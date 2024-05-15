function parseValue(values) {
    let teamCount;
    const excludedUserIds = [];

    values.forEach(value => {
        const [currentTeamCountStr, userId] = value.split('_');

        teamCount = currentTeamCountStr;
        excludedUserIds.push(userId);
    });

    return { teamCount, excludedUserIds };
};


function channelMembersNameList(members, excludedUserIds) {
    const memberInfoList = [];
    members.forEach(member => {
        if (excludedUserIds.includes(member.user.id)) return;
        memberInfoList.push(`${member.nickname ? member.nickname : member.user.globalName}(${member.user.username})`);
    });

    return memberInfoList;
};


async function checkAndNotifyEmptyMembers(interaction, memberInfoList) {
    if (memberInfoList.length === 0) {
        return await interaction.update({
            content: '모든 인원이 제외되어 처리할 수 있는 멤버가 없습니다.',
            components: [],
            ephemeral: true
        });
    };
};


function adjustTeamCount(teamCount, memberInfoList, MAX_TEAM_COUNT) {
    // 만약에 팀 수가 너무 높으면 15로 정하기
    teamCount = Math.min(teamCount, MAX_TEAM_COUNT);

    // 만약 팀 수가 memberInfoList의 길이보다 크면, memberInfoList의 길이로 조정
    if (teamCount > memberInfoList.length) {
        teamCount = memberInfoList.length;
    };

    return teamCount;
};


function divideIntoTeams(memberInfoList, teamCount) {
    const teams = [];
    for (let i = 0; i < teamCount; i++) {
        teams.push([]);
    };

    memberInfoList.forEach((member, index) => {
        teams[index % teamCount].push(member);
    });

    return teams;
};


function createTeamEmbed(teams, EMBED_COLOR) {
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
    return embed;
};

// async function verifyVoiceChannel(interaction) {
//     let voiceChannel = interaction.member.voice.channel;

//     if (!voiceChannel) {
//         await interaction.update({ content: '음성 채널에 있어야 이 기능을 사용할 수 있습니다.', components: [], ephemeral: true });
//         return;
//     };

//     return voiceChannel;
// };

// const { verifyVoiceChannel } = require('./verifyVoiceChannel');


const { EmbedBuilder } = require('discord.js');
const { shuffleArray } = require('../../../../module/common/shuffleArray');


const MAX_TEAM_COUNT = 15;
const EMBED_COLOR = 0x1E90FF;
const TEAM_EMOJIS = ['🔵', '🔴', '🟢', '🟡', '🟣', '🟠', '⚪'];


async function generateTeamEmbed(interaction, voiceChannel, values) {

    // 음성 채널 입장 되어 있는지 체크
    // let voiceChannel = await verifyVoiceChannel(interaction);

    // values 안에 팀과 유저 아이디 분리
    let { teamCount, excludedUserIds } = parseValue(values);

    // 채널 인원들 배열에 [ 현우(hyeonWoo_), ... ] 담기
    const members = voiceChannel.members;
    const memberInfoList = channelMembersNameList(members, excludedUserIds);

    // 모든 인원 제외시 알림 전송
    await checkAndNotifyEmptyMembers(interaction, memberInfoList);

    // 팀 수를 조정한다.
    teamCount = adjustTeamCount(teamCount, memberInfoList, MAX_TEAM_COUNT);

    // 순서 랜덤으로 섞기
    shuffleArray(memberInfoList);

    // 팀 나누기
    let teams = divideIntoTeams(memberInfoList, teamCount);

    // 임베드 구성
    const embed = createTeamEmbed(teams, EMBED_COLOR);

    return embed;

};

module.exports = { generateTeamEmbed };