const formatNicknameByGame = require('../src/events/nicknameFlow/utils/formatNicknameByGame');
const formatRiotTag = require('../src/events/nicknameFlow/utils/formatRiotTag');
const GAME_TYPES = require('../src/constants/gameTypes');

// formatRiotTag의 실제 동작 대신 mock 사용
jest.mock('../src/events/nicknameFlow/utils/formatRiotTag', () => jest.fn());

describe('formatNicknameByGame', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    test('LEAGUE_OF_LEGENDS 게임 타입은 formatRiotTag를 호출한다', () => {
        formatRiotTag.mockReturnValue('FormattedLoL#1234');

        const result = formatNicknameByGame(GAME_TYPES.LEAGUE_OF_LEGENDS, '   LoL#1234   ');

        expect(formatRiotTag).toHaveBeenCalledWith('   LoL#1234   ');
        expect(result).toBe('FormattedLoL#1234');
    });

});
