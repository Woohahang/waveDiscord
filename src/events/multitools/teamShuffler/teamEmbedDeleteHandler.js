// teamEmbedDeleteHandler.js

// 현재는 팀 섞기 삭제 버튼 용도로만 사용하고 있지만, 상호작용 받은 메시지를 삭제하는 일반적인 작업이라 나중에 공용 폴더인 common 으로 빼도 될 것 같다.
async function teamEmbedDelete(interaction) {
    try {
        await interaction.message.delete();
        await interaction.reply({ content: '메시지가 삭제되었습니다.', ephemeral: true });
    } catch (error) {
        console.error('메시지 삭제 중 오류 발생:', error);
        await interaction.reply({ content: '메시지를 삭제하지 못했습니다.', ephemeral: true });
    };
};

module.exports = { teamEmbedDelete };