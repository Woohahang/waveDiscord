const { getState, setState } = require('../aliasModules/state');
const patternKoreanMap = require('../aliasModules/patternKoreanMap');
const getSeparatorByAlias = require('../aliasModules/getSeparatorByAlias');
const guildSettings = require('../../../services/GuildSettings');

// 디스코드 채팅에서 언더바로 인한 기울어짐 방지
const escapeMarkdown = (text) => text.replace(/[*_`]/g, '\\$&');

const createMessage = (translatedPatterns) =>
    '## 설정 완료\n' +
    ` > * ${translatedPatterns}\n` +
    '> * 패턴으로 등록을 완료 했습니다.';


module.exports = async (interaction) => {
    try {
        const guildId = interaction.guild.id;
        const roleId = interaction.values[0];
        setState({ aliasRoleId: roleId });

        const guildData = new guildSettings(guildId);
        await guildData.saveGuildAlias(getState);

        // 메세지 관리
        const { aliasPatterns, aliasSeparator, aliasRoleId } = getState();

        // 번역 된 패턴들
        const separator = getSeparatorByAlias(aliasSeparator); // 분리 기호
        const translatedPatterns = aliasPatterns.map(alias => patternKoreanMap[alias]).join(separator);

        // 만약 분리기호가 언더바라면 인코딩 처리
        const escapedPatterns = escapeMarkdown(translatedPatterns);

        await interaction.update({ content: createMessage(escapedPatterns), components: [], ephemeral: true });

    } catch (error) {
        console.error('nicknameTemplateSaver.js 예외 : ', error);
        await interaction.update({ content: '에러 발생, 문제가 지속 된다면 Wave 디스코드 채널에 문의해주세요.', components: [], ephemeral: true });
    };
};