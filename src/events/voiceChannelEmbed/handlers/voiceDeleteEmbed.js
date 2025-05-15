const getWaveBotMessagesFromCache = require('@utils/discord/getWaveBotMessagesFromCache');
const getDisplayName = require('@utils/discord/getDisplayName');
const filterMessagesByEmbedAuthor = require('@utils/discord/filterMessagesByEmbedAuthor');
const logger = require('@utils/logger');

/**
 * 사용자가 음성 채널에서 퇴장할 때,
 * 해당 사용자의 정보가 담긴 임베드를 찾아 삭제합니다.
 *
 * @param {VoiceState} oldState - 퇴장 전의 음성 상태
 */
module.exports = async (oldState) => {

  const member = oldState.member;
  const avatarURL = member.user.displayAvatarURL();
  const channel = oldState.channel;
  if (!channel) return;

  try {
    // 서버 내 표시 이름(별명 또는 사용자명)
    const displayName = getDisplayName(member);

    // 해당 채널에서 Wave 봇이 보낸 메시지 목록
    const messages = getWaveBotMessagesFromCache(channel);

    // 사용자의 임베드를 찾아 필터링
    const messagesToDelete = filterMessagesByEmbedAuthor(messages, displayName, avatarURL);

    // 해당 메시지들을 삭제
    await Promise.all(messagesToDelete.map(message => message.delete()))
      .catch(error => {
        // 예외 처리: 채널이나 메시지가 이미 삭제된 경우 무시
        // 10003: Unknown Channel, 10008: Unknown Message
        if (error.code === 10008 || error.code === 10003) return;
        throw error;
      });

  } catch (error) {
    logger.error('[voiceDeleteEmbed] 음성채널 퇴장 중 에러', {
      memberId: member.id,
      stack: error.stack
    });
  };
};