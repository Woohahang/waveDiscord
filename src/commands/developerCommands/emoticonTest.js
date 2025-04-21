const { SlashCommandBuilder } = require('discord.js');
const { developerId } = require('../../../../config.json');
const fetchLeagueOfLegendsTier = require('../../wip/fetchLeagueOfLegendsTier');
const saveLeagueOfLegendsTier = require('../../wip/saveLeagueOfLegendsTier');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('테스트')
        .setDescription('테스트용 개발자 명령어입니다.'),

    async execute(interaction) {
        try {
            // 명령어를 실행한 사용자가 개발자인지 확인합니다.
            const userId = interaction.user.id;
            if (userId !== developerId) return;

            const nickname = '겸댕밍#KR1';
            const tierData = await fetchLeagueOfLegendsTier(nickname);

            if (!tierData) {
                await interaction.reply({ content: '티어 정보가 존재하지 않거나 불러오지 못했습니다.', ephemeral: true });
                return;
            }

            await saveLeagueOfLegendsTier(userId, nickname, tierData);

            await interaction.reply({
                content: `겸댕밍님의 티어가 저장되었습니다: ${tierData.tier} ${tierData.rank} (${tierData.leaguePoints}LP)`,
                ephemeral: true
            });

        } catch (error) {
            console.log('테스트 명령어 실행 중 오류가 발생했습니다.');
        };

    }
};