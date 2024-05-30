// sendEmbedOnVoiceJoin.js

const { createFields } = require('../modules/customEmbed');
const { deleteEmbed } = require('../modules/deleteEmbed');
const { customEmbed } = require('../modules/customEmbed');

const GuildSettings = require('../../../services/GuildSettings');
const UserSettings = require('../../../services/UserSettings');


/* 채널 입장 임베드 전송, 이전 중복 메시지 삭제 */
module.exports = async (newState) => {
    try {
        const member = newState.member;
        const channel = newState.channel;
        const guildId = newState.guild.id;

        // 인스턴스 생성
        const userStettings = new UserSettings(member.id);

        // 유저 데이터 불러오기
        const userNicknames = await userStettings.load();
        if (!userNicknames) return;

        // 길드 인스턴스 생성
        const guildSettings = new GuildSettings(guildId);

        // 길드 데이터 불러오기
        const guildData = await guildSettings.loadOrCreate();
        if (!guildData) { return console.log('길드 데이터를 찾을 수 없을 때 나오는 콘솔인데 나올리가 없겠지?') };

        // 유저 닉네임 양식에 맞게 가공
        const fields = await createFields(userNicknames, guildData);
        if (fields.length <= 0) return;

        // 이 전 임베드 삭제
        await deleteEmbed(newState, member);

        // 임베드 가공
        const embed = customEmbed(member, fields, userNicknames.updatedAt);

        // 임베드 전송
        await channel.send({
            embeds: [embed],
        });



    } catch (error) {
        console.error('sendEmbedOnVoiceJoin 에러 : ', error);
    };
};







const { EmbedBuilder } = require('discord.js');



function embedTest() {
    const exampleEmbed = new EmbedBuilder()
        .setColor(0x0099FF)
        // .setTitle('끼매누')
        // .setURL('https://discord.js.org/')
        .setAuthor({ name: '끼매누', iconURL: 'https://i.imgur.com/AfFp7pu.png', url: 'https://discord.js.org' })
        // .setDescription('Some description here')
        // .setThumbnail('https://i.imgur.com/AfFp7pu.png')
        .addFields(
            { name: 'Riot Games', value: '<:lol:1245155439205814355> 끼매누#KR1\n우당탕#KR1' },
            { name: '\u200B', value: '\u200B' },
        )
        // .addFields({ name: 'Inline field title', value: 'Some value here', inline: true })
        // .setImage('https://i.imgur.com/AfFp7pu.png')
        .setTimestamp()
        .setFooter({ text: 'Some footer text here', iconURL: 'https://i.imgur.com/AfFp7pu.png' });

    return exampleEmbed;
};