// userSearch.js

const { UserSelectMenuBuilder, ActionRowBuilder } = require('discord.js');


async function userSearch(interaction) {

    const userSelect = new UserSelectMenuBuilder()
        .setCustomId('users')
        .setPlaceholder('Select multiple users.')
        .setMinValues(1)
        .setMaxValues(5)

    const row = new ActionRowBuilder()
        .addComponents(userSelect);

    await interaction.reply({
        content: '테스트',
        components: [row],
        ephemeral: true
    });

};

module.exports = { userSearch };

// if (!interaction.member.voice.channel) {
//     return await interaction.reply({ content: '음성 채널에 있어야 이 기능을 사용할 수 있습니다.', ephemeral: true });
// };

// // 현재 음성 채널에 입장 중인 사람들을 가져옵니다.
// const channelMembers = interaction.member.voice.channel.members;
// // 음성 채널에 있는 사용자의 ID를 배열로 추출합니다.
// const defaultUserIds = channelMembers.map(member => member.id);



/*

.addDefaultUsers : 기본으로 선택 됨

*/