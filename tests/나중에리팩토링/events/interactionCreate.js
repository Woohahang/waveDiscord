const executeCommand = async (interaction) => {
    // 명령어 실행 로직
};

const executeComponentInteraction = async (interaction) => {
    // 컴포넌트 상호작용 로직
    try {
        switch (interaction.customId) {
            case 'gameMenu':
                saveNickname(interaction);
                break;
            case 'removeNickNames':
                removeNickname(interaction);
                break;
            case 'removeButton':
                const command = await interaction.client.commands.get('닉네임삭제');
                await command.execute(interaction);
                break;
            case 'upDate':
                upDateButton(interaction);
                break;
            default:
                console.log('isMessageComponent 에서 알 수 없는 customId : ' + interaction.customId);
        }
    } catch (error) {
        console.error('isMessageComponent 에서 Interaction 처리 중 오류 발생:', error);
        await interaction.reply({ content: '상호 작용 처리 중 오류가 발생했습니다!', ephemeral: true });
    }

    // 관리자 채널 관련 처리
    // 이 부분은 interaction.values를 확인하는 것으로 보아 select 메뉴의 처리가 포함될 수 있습니다.
    // 따라서, 이 select 메뉴 처리는 ComponentInteraction 내에서 관리될 수 있습니다.
    switch (interaction.values?.[0]) {
        case 'hideMenu':
            hideMenu(interaction);
            break;
        case 'showMenu':
        case 'changeOrder':
            console.log('미구현');
            break;
    }

};

const executeModalSubmit = async (interaction) => {
    // 모달 제출 로직
};

module.exports = { executeCommand, executeComponentInteraction, executeModalSubmit };