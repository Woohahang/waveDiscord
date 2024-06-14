const { getState, setState } = require('../aliasModules/state');
const guildSettings = require('../../../services/GuildSettings');

module.exports = async (interaction) => {
    try {
        const guildId = interaction.guild.id;
        const aliasRoleId = interaction.values[0];
        setState({ aliasRoleId });

        const guildData = new guildSettings(guildId);
        await guildData.saveGuildAlias(getState);

        await interaction.update({ content: '등록 완료', components: [], ephemeral: true });

    } catch (error) {
        console.error('nicknameTemplateSaver.js 예외 : ', error);
        await interaction.update({ content: '에러 발생, 문제가 지속 된다면 Wave 디스코드 채널에 문의해주세요.', components: [], ephemeral: true });
    };
};