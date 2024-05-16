const { StringSelectMenuBuilder, ActionRowBuilder } = require('discord.js');
const { verifyVoiceChannel } = require('./module/verifyVoiceChannel');

function voiceChannelUsers(voiceChannel) {
    try {
        let users = [];

        voiceChannel.members.forEach(member => {

            const displayName = member.nickname ? member.nickname : member.user.globalName;
            const userName = member.user.username;
            const userValue = member.id;

            users.push({
                label: displayName + `(${userName})`, // 라벨 길이 제한
                value: userValue // 상호작용을 줄이기 위해 필요한 정보를 value 에 담음
            });
        });

        return users;
    } catch (error) {
        console.error('voiceChannelUsers 에러 : ' + error);
        throw error;
    };

};

// 숫자만 작성할 수 있습니다.
function checkIfNumeric(values) {
    const value = values[0].replace(/_/g, '');
    return isNaN(value);
}

function excludeMembersMenu(users, values) {

    const select = new StringSelectMenuBuilder()
        .setCustomId('excludeMembers')
        .setPlaceholder('게임을 하지 않는 인원이 있나요 ?')
        .setMinValues(1) // 최소 1개의 옵션을 선택해야 함
        .setMaxValues(users.length + 1); // '없음' 옵션을 포함한 최대 선택 가능 수 설정

    // '없음' 옵션을 추가합니다. 이 옵션은 항상 단 한 번만 추가되어야 합니다.
    select.addOptions([
        {
            label: '없음',
            description: '모두가 참여합니다.',
            value: values + 'allParticipants'
        }
    ]);

    // 사용자 목록을 바탕으로 다른 옵션들을 반복적으로 추가합니다.
    users.forEach(user => {
        select.addOptions([
            {
                label: user.label,
                description: '팀 섞기 인원에서 제외할게요',
                value: values + user.value
            }
        ]);
    });

    return row = new ActionRowBuilder()
        .addComponents(select);

};

// 잠수 유저를 선택해주세요 인원에서 제외할게요
async function excludeMembers(interaction, values) {
    try {

        // 만약 모달 제출이면 값을 values 에 저장
        if (interaction.isModalSubmit()) {

            values = [interaction.fields.getTextInputValue('teamNumberModal') + '_'];

            if (checkIfNumeric(values)) {
                return interaction.update({
                    content: '숫자만 입력할 수 있습니다.',
                    components: [],
                    ephemeral: true
                });
            };
        };

        // 음성 채널 체크와 음성 채널 객체
        const voiceChannel = await verifyVoiceChannel(interaction);

        const users = voiceChannelUsers(voiceChannel);

        await interaction.update({
            components: [excludeMembersMenu(users, values)],
            ephemeral: true
        });

    } catch (error) {
        console.error('excludeMembers 에러 : ' + error);
    };

};

module.exports = { excludeMembers };