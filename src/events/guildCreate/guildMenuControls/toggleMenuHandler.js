// toggleMenuHandler.js

const GuildSettings = require('../../../services/GuildSettings');
const adminChannelUpDate = require('../module/adminChannelUpDate');
const mainChannelUpdate = require('../module/mainChannelUpdate');
const emojiUpdate = require('../guildEmoji/emojiUpdate');

const updateCompleted =
    '\n' + '## 업데이트 완료' +
    '\n' + '> * 닉네임 등록 채널 메뉴' +
    '\n' + '> * 음성 채널 입장 메뉴';

module.exports = async (interaction) => {

    // interaction 객체에서 customId와 선택된 값을 가져옵니다.
    const customid = interaction.customId;
    const selections = interaction.values;

    // 길드 인스턴스 생성를 생성하고 불러옵니다.
    const guildSettings = new GuildSettings(interaction.guild.id);
    let guildData = await guildSettings.loadOrCreate();

    try {
        // 게임들을 숨기거나 보이게합니다.
        selections.forEach(selection => {
            const action = customid === 'showMenu' ? true : false;

            guildData[selection] = action;
        });

        // 변경된 데이터를 DB에 저장합니다.
        await guildData.save();

        // 서버 채널을 업데이트합니다.
        await Promise.all([
            adminChannelUpDate(interaction, guildSettings),
            mainChannelUpdate(interaction, guildSettings),
            emojiUpdate(interaction.guild)
        ]);

        // 업데이트 완료 알림 전송
        await interaction.update({ content: updateCompleted, components: [], ephemeral: true });

    } catch (error) {
        console.error('toggleMenuHandler.js 에러 : ', error);
    };

};

/*
메세지 20초 뒤 삭제 하는 방법은

reply 만 된다고 한다. 이전 상호작용에서 대답을 안 하게 하고
여기서 reply를 써서 셋타임 아웃을 하면 될 것 같은데 아직 안 해봤다.

*/