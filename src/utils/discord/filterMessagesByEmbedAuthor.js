/**
 * 메시지 배열에서 임베드의 author 정보가 주어진 이름과 아바타 URL과 일치하는 메시지들만 필터링합니다.
 *
 * @param {Message[]} messages - 필터링할 Discord 메시지 배열
 * @param {string} displayName - 비교할 author.name (보통 사용자의 표시 이름)
 * @param {string} avatarURL - 비교할 author.iconURL (보통 사용자의 아바타 URL)
 * @returns {Message[]} 조건에 일치하는 메시지 배열
 */
function filterMessagesByEmbedAuthor(messages, displayName, avatarURL) {
    return messages.filter(({ embeds }) =>
        embeds.some(({ author }) =>
            author &&
            author.name === displayName &&
            author.iconURL === avatarURL
        )
    )
}

module.exports = filterMessagesByEmbedAuthor