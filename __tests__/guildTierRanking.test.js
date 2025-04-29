const guildTierRanking = require('../src/events/ranking/guildTierRanking');
const UserSettings = require('../src/services/UserSettings');
const fetchMemberDisplayNames = require('../src/events/ranking/modules/fetchMemberDisplayNames');
const buildTierDescription = require('../src/events/ranking/modules/buildTierDescription');

// 의존성 모듈을 mock 처리
jest.mock('../src/services/UserSettings');
jest.mock('../src/events/ranking/modules/fetchMemberDisplayNames');
jest.mock('../src/events/ranking/modules/buildTierDescription');

describe('guildTierRanking', () => {
    it('should reply with the built tier description', async () => {

        // 가짜 길드 정보 생성
        const fakeGuild = { name: 'Test Guild' };

        // 가짜 interaction 객체 생성 (디스코드 상호작용)
        const fakeInteraction = {
            guild: fakeGuild,
            reply: jest.fn(), // reply 메서드 mock 처리
        };

        // fetchMemberDisplayNames 모듈이 반환할 가짜 데이터 설정
        fetchMemberDisplayNames.mockResolvedValue(new Map([
            ['01231231231', '길드사람 닉네임 1'],
            ['23123123121', '길드사람 닉네임 2'],
            ['76576978757', '길드사람 닉네임 3'],
        ]));

        // UserSettings의 findUsersWithLoLTierByIds 메서드가 반환할 가짜 데이터 설정
        UserSettings.findUsersWithLoLTierByIds.mockResolvedValue([
            {
                userId: '01231231231',
                leagueOfLegends: [
                    { tier: 'GOLD', rank: 'I', summonerName: '롤닉네임#KR1', leaguePoints: 92 },
                ],
            },
        ]);

        // buildTierDescription이 반환할 가짜 티어 설명 설정
        buildTierDescription.mockReturnValue('Fake Tier Description');

        // guildTierRanking 함수를 호출하고, interaction.reply가 호출되는지 확인
        await guildTierRanking(fakeInteraction);

        // reply 메서드가 Fake Tier Description으로 호출되는지 확인
        expect(fakeInteraction.reply).toHaveBeenCalledWith({ content: 'Fake Tier Description' });

    });
});