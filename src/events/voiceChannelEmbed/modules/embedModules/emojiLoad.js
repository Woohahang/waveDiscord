// emojiLoad.js

async function emojiLoad(newState, emojiMaps) {
    try {
        const guild = newState.guild;

        // 서버의 모든 이모지를 가지고 온 다음, Wave 이모지 필터링
        const serverEmojis = await guild.emojis.fetch();
        const waveEmojis = serverEmojis
            .filter(emoji => emoji.name.split('_')[0] === 'wave');

        // 길드 ID를 키로 하고, 해당 길드의 Wave 이모지들을 맵에 저장
        emojiMaps[guild.id] = new Map();
        waveEmojis.forEach(emoji => {
            emojiMaps[guild.id].set(emoji.name, emoji.id);
        });

        // 해당 길드의 Wave 이모지 맵을 반환
        return emojiMaps[guild.id];

    } catch (error) {
        throw error;
    };
};

module.exports = emojiLoad;