const CUSTOM_IDS = require('@shared/constants/interactionCustomIds');
const { StringSelectMenuBuilder, ActionRowBuilder } = require('discord.js');
const getGameDisplayName = require('@shared/utils/getGameDisplayName');
const getStateMessage = require('@shared/utils/stateMessage');
const logger = require('@utils/logger');

function buildRemovableNicknameOptions(nicknameEntries) {
    return nicknameEntries.map(({ _id, gameType, nickname }) => ({
        value: _id,
        label: nickname,
        description: getGameDisplayName(gameType, 'ko'),
    }));
}

function buildRemoveNicknameMenu(options) {
    const menu = new StringSelectMenuBuilder()
        .setCustomId(CUSTOM_IDS.USER.REMOVE_NICKNAME.SELECT_NICKNAMES)
        .setPlaceholder('삭제할 닉네임을 선택하세요')
        .setMinValues(1)
        .setMaxValues(options.length)
        .addOptions(options);

    return new ActionRowBuilder().addComponents(menu);
}

module.exports = async function handleRemoveNicknameButton(interaction, dependencies) {

    const userId = interaction.member.id;

    try {
        const result = await dependencies.getRemovableNicknamesUseCase.execute({
            userId
        });

        if (!result.ok) {
            return interaction.reply({
                content: getStateMessage(result.code),
                ephemeral: true
            });
        }

        const options = buildRemovableNicknameOptions(result.data);
        const menu = buildRemoveNicknameMenu(options);

        await interaction.reply({
            content: '### 삭제하려는 닉네임을 아래 목록에서 선택해주세요. 🗑️',
            components: [menu],
            ephemeral: true
        });

    } catch (error) {
        logger.error('[handleRemoveNicknameButton] 닉네임 삭제중 에러 발생',
            userId,
        );
    }
}