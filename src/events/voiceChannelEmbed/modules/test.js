// test.js

let emojiCache = null;

async function emojiLoad(newState) {
    try {
        const guild = newState.guild;
        const serverEmojis = await guild.emojis.fetch();

        const waveEmojis = serverEmojis
            .filter(emoji => emoji.name.split('_')[0] === 'wave')
            .map(emoji => emoji.name);

        emojiCache = waveEmojis;

        return waveEmojis;

    } catch (error) {
        throw error;
    };
};

function createFields(userData, guildData, waveEmojis) {
    try {
        let fields = [];
        const games = ['steam', 'leagueOfLegends', 'teamfightTactics', 'valorant', 'steamBattleGround', 'kakaoBattleGround', 'blizzard', 'overWatchTwo'];

        console.log('userData : ', userData);

        const userNamelength = games.reduce((count, game) => {
            if (Array.isArray(userData[game])) {
                return count + userData[game].length;
            };
            return count;
        }, 0);

        // console.log(userNamelength)


    } catch (error) {
        throw error;
    };
};

module.exports = async (newState, userData, guildData) => {
    try {
        const member = newState.member;
        const guildId = newState.guild.id;
        const displayName = member.nickname ? member.nickname : member.user.globalName;
        const waveEmojis = emojiCache || await emojiLoad(newState);

        createFields(userData, guildData, waveEmojis);

    } catch (error) {
        console.error('test.js 예외 : ', error);
    };
};