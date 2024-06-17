const { EmbedBuilder } = require('discord.js');

const platformName = {
    steam: 'Steam',
    riotGames: 'Riot Games',
    battleGround: 'Battle Ground',
    blizzard: 'Blizzard'
};

const platforms = {
    steam: ['steam'],
    riotGames: ['leagueOfLegends', 'teamfightTactics', 'valorant'],
    battleGround: ['steamBattleGround', 'kakaoBattleGround'],
    blizzard: ['blizzard', 'overWatchTwo']
};

function createFields(userData) {
    const fields = [];

    // games 객체의 각 플랫폼(예: steam, riotGames 등)에 대해 반복
    Object.keys(platforms).forEach(platform => {
        // 플랫폼에 속한 게임 목록을 가져옴 (배열 형태로 변환)
        const platformGames = Array.isArray(platforms[platform]) ? platforms[platform] : [platforms[platform]];

        // 닉네임이 있는 게임 목록만 필터링
        const userGames = platformGames.filter(game => userData[game] && userData[game].length > 0);

        if (userGames.length > 0) {
            // 각 게임에 대해 닉네임을 문자열로 변환하여 결합
            const value = userGames.map(game => {
                if (game === 'steam') {
                    return userData[game].map(entry => ` [${entry.playerName}](${entry.profileLink})`);
                } else {
                    return userData[game].map(nickname => ` ${nickname}`);
                };
            }).join('\n');

            fields.push({ name: `**${platformName[platform]}**`, value });
        };
    });

    return fields;
};

module.exports = (interaction, userData) => {
    try {
        const member = interaction.member;
        const displayName = member.nickname ? member.nickname : member.user.globalName;

        const embed = new EmbedBuilder()
            .setColor('#0099ff')
            .setColor(0x0099FF)
            .setAuthor({ name: displayName, iconURL: member.user.displayAvatarURL(), url: member.user.avatarURL() })
            .addFields(createFields(userData))
            .setTimestamp(new Date(userData.updatedAt))
            .setFooter({ text: '―――――――― update', iconURL: 'https://drive.google.com/uc?export=view&id=19W-rsIvrkFJSJcZ7-PHXOfZcPRO1HYTi' });

        return embed;

    } catch (error) {
        throw error;
    };
};