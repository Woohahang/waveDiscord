// voiceMoveEmbed.js

const UserSettings = require('../../../services/UserSettings');
const GuildSettings = require('../../../services/GuildSettings');

const { deleteEmbed } = require('../../voiceChannelEmbed/modules/deleteEmbed');
const customEmbed = require('../modules/customEmbed');

// 목적, 채널 이동시 임베드 삭제와 전송
module.exports = async (oldState, newState) => {

    // const member = newState.member;
    // const guildId = newState.guild.id;
    // const channel = newState.channel;

    // await deleteEmbed(oldState, oldState.member);

    // // 유저 인스턴스 생성 -> 유저 데이터 불러오기
    // const userSettings = new UserSettings(member.id);
    // const nickNames = await userSettings.load();
    // if (!nickNames) return;

    // // 길드 인스턴스 생성 -> 길드 데이터 불러오기
    // const guildSettings = new GuildSettings(guildId);
    // const guildData = await guildSettings.loadOrCreate();
    // if (!guildData) { return console.log('길드 데이터를 찾을 수 없을 때 나오는 콘솔인데 나올리가 없겠지?') };

    // // 임베드 커스텀
    // const embed = customEmbed(newState, nickNames, guildData);

    // await channel.send({
    //     embeds: [embed]
    // });

};