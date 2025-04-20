const { StringSelectMenuBuilder, StringSelectMenuOptionBuilder, ActionRowBuilder, PermissionsBitField } = require('discord.js');
const { setState } = require('../aliasModules/state');
const translatedPatterns = require('../aliasModules/translatedPatterns');

async function createSelectMenu(guild) {
    try {
        const roles = await guild.roles.fetch();

        const isNotAdminRole = role => !role.permissions.has(PermissionsBitField.Flags.Administrator);
        const isNotEveryoneRole = role => role.id !== guild.id;
        const isNotBotRole = role => !role.managed;

        // 관리자 권한과 @everyone 및 봇 역할 제외
        const filteredRoles = roles.filter(role =>
            isNotAdminRole(role) &&
            isNotEveryoneRole(role) &&
            isNotBotRole(role)
        );

        const options = filteredRoles.map(role =>
            new StringSelectMenuOptionBuilder()
                .setLabel(`서버 닉네임 양식과 일치하는 유저가 감지되면,`)
                .setDescription(`${role.name} 역할을 부여하기 !`)
                .setValue(role.id)
        );

        // 역할 할당 roleAssignment
        const select = new StringSelectMenuBuilder()
            .setCustomId('roleAssignment')
            .addOptions(options);

        return new ActionRowBuilder().addComponents(select);
    } catch (error) {
        throw error;
    };
};

const message = (patterns) =>
    `## 📝 ${patterns}\n` +
    '> * 서버 닉네임 양식과 일치하나요 ?\n' +
    '> * 일치한다면 진행해주세요 !\n';

module.exports = async (interaction) => {
    try {
        const guild = interaction.guild;

        // 구분 기호 및 상태 저장
        const aliasSeparator = interaction.values[0];
        setState({ aliasSeparator });

        const patterns = translatedPatterns();

        // 패턴 적용할 역할 메뉴 생성
        const rol = await createSelectMenu(guild);

        await interaction.update({
            content: message(patterns),
            components: [rol],
            ephemeral: true
        });

    } catch (error) {
        console.error('nicknameRoleAssigner.js 예외 : ', error);
        await interaction.update({ content: '에러', components: [], ephemeral: true });
    };
};