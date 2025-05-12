const { clientId } = require('../../../../../config.json');
const getDisplayName = require('@utils/discord/getDisplayName');
const logger = require('@utils/logger');

/* 중복 된 유저 정보 메세지 삭제 */
module.exports = async (oldState) => {

  const member = oldState.member;
  const channel = oldState.channel;
  if (!channel) return;

  try {
    // 서버 별명 또는 유저 닉네임
    const displayName = getDisplayName(member);

    const messages = await channel.messages.fetch({ limit: 20 });
    if (!messages) return;

    // Wave 가 보낸 메세지들
    const waveEmbeds = messages.filter(message => message.author.id === clientId && message.embeds.length > 0);

    // 중복된 유저 정보를 담고 있는 메시지들
    const duplicateUserInfo = waveEmbeds.filter(message =>
      message.embeds.some(embed =>
        embed.author &&
        embed.author.name === displayName &&
        embed.author.iconURL === member.user.displayAvatarURL()
      )
    );

    await Promise.all(duplicateUserInfo.map(message => message.delete()));

  } catch (error) {
    if (error.code === 10008 || error.code === 10003 || error.code === 'ChaeenlNotCached') return;

    logger.error('[voiceDeleteEmbed] 음성채널 퇴장 중 에러', {
      memberId: member.id,
      stack: error.stack
    });
  };
};

/* Promise.all
내부에 .catch()를 사용하는 이유:
  - 개별적으로 에러를 처리하여 하나의 메시지 삭제가 실패하더라도 나머지 메시지를 계속 삭제할 수 있다.

내부에 .catch()에서 throw를 사용하지 않는 이유:
  - 모든 프로미스의 결과를 기다리고 개별 에러를 처리하기 위해서이다. 만약 throw를 사용하면 하나의 메시지 삭제 실패 시 전체 삭제 작업이 취소될 수 있다.

Promise.all을 사용하는 이유:
  - 병렬 처리에 유용하여 여러 개의 비동기 작업을 동시에 실행하고, 모든 작업이 완료될 때까지 기다릴 수 있다.
*/
