// toggleMenuHandler.js

const GuildSettings = require('../../../services/GuildSettings');
const adminChannelUpDate = require('../update/updateModule/adminChannelUpDate');
const mainChannelUpdate = require('../update/updateModule/mainChannelUpdate');
const emojiUpdate = require('../guildEmoji/emojiHandler/emojiUpdate');
const { updateCompleted, updateFailed, updateEmojiFailed } = require('../update/updateModule/message');

module.exports = async (interaction) => {
    try {
        const guild = interaction.guild;

        // interaction 객체에서 customId와 선택된 값을 가져옵니다.
        const customid = interaction.customId;
        const selections = interaction.values;

        // 길드 인스턴스 생성를 생성하고 불러옵니다.
        const guildSettings = new GuildSettings(interaction.guild.id);
        let guildData = await guildSettings.loadOrCreate();

        // 게임들을 숨기거나 보이게합니다.
        selections.forEach(selection => {
            const action = customid === 'showMenu' ? true : false;

            guildData[selection] = action;
        });

        // 변경된 데이터를 DB에 저장합니다.
        await guildData.save();

        // 사용자에게 초기 응답을 즉시 보냅니다.
        await interaction.update({ content: '업데이트를 시작했습니다. 잠시만 기다려주세요...', components: [], ephemeral: true });

        // 서버 채널을 업데이트합니다.
        await Promise.all([
            adminChannelUpDate(interaction),
            mainChannelUpdate(interaction, guildData),
            emojiUpdate(guild)
        ]);

        await interaction.editReply({ content: updateCompleted, components: [], ephemeral: true });

    } catch (error) {

        switch (error.code) {
            case 'EMOJI_SLOT_ERROR': // 이모지 슬롯 초과
                interaction.editReply({ content: updateEmojiFailed, ephemeral: true });
                break;

            default:  // 다른 모든 에러
                interaction.editReply({ content: updateFailed, ephemeral: true });
                console.error('toggleMenuHandler.js 업데이트 실패 : ', error);
        };

    };
};



/*
메세지 20초 뒤 삭제 하는 방법은

reply 만 된다고 한다. 이전 상호작용에서 대답을 안 하게 하고
여기서 reply를 써서 셋타임 아웃을 하면 될 것 같은데 아직 안 해봤다.
*/