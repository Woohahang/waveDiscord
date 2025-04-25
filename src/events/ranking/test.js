const UserSettings = require('../../services/UserSettings');
const getTierScore = require('./getTierScore');
const getDisplayName = require('../../shared/utils/getDisplayName');
const { TIER_ORDER } = require('./loltier');
const { getLoLTierEmoji } = require('../../constants/lolTierEmoji');
const { toPrettyRoman } = require('../../constants/roman');

// 랭킹을 보여주는 기능입니다.
module.exports = async (interaction) => {

    const members = await interaction.guild.members.fetch();
    const memberIds = [...members.keys()];

    const memberMap = new Map();
    members.forEach(member => {
        memberMap.set(member.id, getDisplayName(member));
    });

    // 티어가 있는 롤 닉네임이 하나라도 있다면 들고옵니다.
    const guildUserDatas = await UserSettings.findUsersWithLoLTierByIds(memberIds);

    const highestTierUsers = guildUserDatas.map(user => {
        // 티어가 있는 객체만 들고옵니다.
        const validEntries = user.leagueOfLegends.filter(e => e.tier);

        // 객체가 없다면 null.
        if (validEntries.length === 0) return null;

        // console.log('validEntries :', validEntries);

        // 가장 높은 티어를 선택합니다.
        const bestEntry = validEntries.reduce((prev, curr) => {

            // console.log('prev :', prev);
            // console.log('curr :', curr);

            return getTierScore(curr) > getTierScore(prev) ? curr : prev;
        });

        return {
            displayName: memberMap.get(user.userId),
            userId: user.userId,
            summonerName: bestEntry.summonerName,
            tier: bestEntry.tier.toUpperCase(),
            rank: bestEntry.rank,
            leaguePoints: bestEntry.leaguePoints,
            score: getTierScore(bestEntry)
        };

    }).filter(Boolean);


    // 티어 높은 순으로 정렬
    highestTierUsers.sort((a, b) => b.score - a.score);

    const grouped = {};
    for (const user of highestTierUsers) {
        const tier = user.tier;
        if (!grouped[tier]) grouped[tier] = [];
        grouped[tier].push(user);
    }

    let description = `## ${getLoLTierEmoji('CLASH')} ${interaction.guild.name}\n`;
    for (const tier of TIER_ORDER) {
        if (!grouped[tier]) continue;

        description += `## ${getLoLTierEmoji(tier)} ${toPrettyRoman(tier[0]) + tier.slice(1).toLowerCase()}\n`;

        grouped[tier].forEach(user => {
            description += `**${user.rank}** ${user.summonerName} ⦁ ${user.displayName}\n`;
        });
    }

    await interaction.reply({ content: description });

};