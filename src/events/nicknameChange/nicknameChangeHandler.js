const guildSettings = require('../../services/GuildSettings');

// 롤 기준 티어 리스트
const tierList = ['C', 'GM', 'M', 'D', 'E', 'P', 'G', 'S', 'B', 'I', 'U'];

module.exports = async (oldMember, newMember) => {
    try {
        const newName = newMember.nickname;
        if (!newName) return; // 닉네임이 없으면 종료

        const guildId = newMember.guild.id;
        const guildData = new guildSettings(guildId);
        let { aliasPatterns, aliasSeparator, aliasRoleId } = await guildData.getGuildData();

        if (aliasSeparator === 'space') {
            aliasSeparator = ' ';
        };

        // 구분 기호를 기준으로 닉네임 분할
        const nameParts = newName.split(aliasSeparator);

        // 패턴 길이가 다르다면 종료
        if (nameParts.length !== aliasPatterns.length) return;

        let isValid = true; // 초기값을 true로 설정하고, 조건에 맞지 않으면 false로 변경

        aliasPatterns.forEach((pattern, index) => {
            // nameParts 배열에서 index 위치의 부분 문자열을 가져와서 앞뒤 공백을 제거합니다.
            const part = nameParts[index].trim();

            switch (pattern) {
                case 'age':
                    // part가 숫자로만 이루어져 있는지 검사합니다.
                    if (!/^\d+$/.test(part)) isValid = false;
                    break;

                case 'gender':
                    // part가 '남' 또는 '여'인지 검사합니다.
                    if (part !== '남' && part !== '여') isValid = false;
                    break;

                case 'tier':
                    if (!tierList.includes(part)) isValid = false;
                    break;

            };
        });

        if (isValid) {
            const role = await newMember.guild.roles.fetch(aliasRoleId);

            await newMember.roles.add(role);
        };


    } catch (error) {
        console.error('nicknameChangeHandler.js 예외 : ', error);
    };
};