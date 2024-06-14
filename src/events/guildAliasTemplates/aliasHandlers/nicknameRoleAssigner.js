const { StringSelectMenuBuilder, StringSelectMenuOptionBuilder, ActionRowBuilder, PermissionsBitField } = require('discord.js');
const { getState, setState } = require('../aliasModules/state');

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

function getSeparatorByAlias(aliasSeparator) {
    switch (aliasSeparator) {
        case 'space':
            return ' ';
        case 'slash':
            return '/';
        case 'hyphen':
            return '-';
        case 'underscore':
            return '_';
        default:
            return ' ';
    };
};

const valueToKoreanMap = {
    nickName: '닉네임',
    age: '나이',
    gender: '성별',
    tier: '티어'
};

// 선택된 값에 따라 한글 변환
const generateKoreanMessage = (aliasPatterns, separator) => {
    return aliasPatterns.map(value => valueToKoreanMap[value] || value).join(separator);
};

const message = (guildAliasPattern) =>
    `## 📝 ${guildAliasPattern}\n` +
    '> * 서버 닉네임 양식과 일치하나요 ?\n' +
    '> * 일치한다면 진행해주세요 !\n';

module.exports = async (interaction) => {
    try {
        const guild = interaction.guild;

        const aliasSeparator = interaction.values[0];
        setState({ aliasSeparator });

        const aliasPatterns = getState().aliasPatterns;
        // 구분자 및 한글 변환 예시 생성
        const separator = getSeparatorByAlias(aliasSeparator);
        const guildAliasPattern = generateKoreanMessage(aliasPatterns, separator)

        // 길드에 있는 역할들
        const rol = await createSelectMenu(guild);

        await interaction.update({ content: message(guildAliasPattern), components: [rol], ephemeral: true });

    } catch (error) {
        console.error('nicknameRoleAssigner.js 예외 : ', error);
        await interaction.update({ content: '에러', components: [], ephemeral: true });
    };
};