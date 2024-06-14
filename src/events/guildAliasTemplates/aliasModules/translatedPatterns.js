const { getState } = require('../aliasModules/state');

function translatedPatterns() {
    try {
        const patternKoreanMap = {
            nickName: '닉네임',
            age: '나이',
            gender: '성별',
            tier: '티어'
        };

        // 현재 상태
        const { aliasPatterns, aliasSeparator, aliasRoleId } = getState();

        if (aliasSeparator) {
            switch (aliasSeparator) {
                case 'space':
                    separator = ' ';
                    break;

                case '_':
                    separator = '\\_';
                    break;

                case '':
                    separator = ',';
                    break;

                default:
                    separator = aliasSeparator;
            };

            return aliasPatterns.map(value => patternKoreanMap[value]).join(separator);
        };

        if (aliasPatterns) {
            return aliasPatterns.map(value => patternKoreanMap[value]).join(',');
        };

    } catch (error) {
        throw error;
    };
};

module.exports = translatedPatterns;