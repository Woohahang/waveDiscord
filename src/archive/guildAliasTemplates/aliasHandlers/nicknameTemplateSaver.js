// const { getState, setState } = require('../aliasModules/state');
// const translatedPatterns = require('../aliasModules/translatedPatterns');
// const guildSettings = require('../../../services/GuildSettings');


// const createMessage = (patterns, roleName) =>
//     `## 🎉 ${patterns}\n` +
//     '> * 패턴을 성공적으로 등록했습니다 !\n' +
//     '> * 이제 **Wave** 가 닉네임 변동을 감지하여\n' +
//     `> * **${roleName}** 역할을 자동으로 지급할게요 !`;

// module.exports = async (interaction) => {
//     try {
//         // 선택 된 역할 id, 상태 저장
//         const roleId = interaction.values[0];
//         setState({ aliasRoleId: roleId });

//         // 길드 인스턴스 생성 및 길드 닉네임 패턴 저장
//         const guildId = interaction.guild.id;
//         const guildData = new guildSettings(guildId);
//         await guildData.saveAliasPatterns(getState());

//         // 패턴 한글 번역
//         const patterns = translatedPatterns();

//         // 역할 id로
//         const role = await interaction.guild.roles.fetch(roleId);
//         const roleName = role.name;

//         // 작업 성공 메세지 전송
//         await interaction.update({
//             content: createMessage(patterns, roleName),
//             components: [],
//             ephemeral: true
//         });

//     } catch (error) {
//         console.error('nicknameTemplateSaver.js 예외 : ', error);
//         await interaction.update({ content: '에러 발생, 문제가 지속 된다면 Wave 디스코드 채널에 문의해주세요.', components: [], ephemeral: true });
//     };
// };