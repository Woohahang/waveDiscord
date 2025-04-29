const guildTierRanking = require('../src/events/ranking/guildTierRanking'); // 경로 맞게 수정!
const UserSettings = require('../src/services/UserSettings');
const fetchMemberDisplayNames = require('../src/events/ranking/modules/fetchMemberDisplayNames');
const buildTierDescription = require('../src/events/ranking/modules/buildTierDescription');

jest.mock('../src/services/UserSettings');
jest.mock('../src/events/ranking/modules/fetchMemberDisplayNames');
jest.mock('../src/events/ranking/modules/buildTierDescription');

describe('guildTierRanking', () => {
    it('should reply with the built tier description', async () => {
        const fakeGuild = { name: 'Test Guild' };
        const fakeInteraction = {
            guild: fakeGuild,
            reply: jest.fn(),
        };

        fetchMemberDisplayNames.mockResolvedValue(new Map([
            ['123', 'TestUser1'],
        ]));

        UserSettings.findUsersWithLoLTierByIds.mockResolvedValue([
            {
                userId: '123',
                leagueOfLegends: [
                    { tier: 'GOLD', rank: 'I', summonerName: 'Summoner1', leaguePoints: 100 },
                ],
            },
        ]);

        buildTierDescription.mockReturnValue('Fake Tier Description');

        await guildTierRanking(fakeInteraction);

        expect(fakeInteraction.reply).toHaveBeenCalledWith({ content: 'Fake Tier Description' });
    });
});
