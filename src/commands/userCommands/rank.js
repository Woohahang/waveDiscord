const { SlashCommandBuilder } = require('discord.js');
const guildTierRanking = require('@events/ranking/guildTierRanking');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('랭킹')
        .setDescription('서버 멤버들의 리그 오브 레전드 티어 랭킹을 확인합니다.'),

    async execute(interaction) {
        try {
            await guildTierRanking(interaction);
        } catch (error) {
            console.error('[rank] 랭킹 커맨드 실행 오류: ', error);
        };
    }
};