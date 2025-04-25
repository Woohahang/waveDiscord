const lolTierEmojiMap = {
    CHALLENGER: '<:lol_challenger:1365067284774654043>',
    GRANDMASTER: '<:lol_grandmaster:1365067306119462932>',
    MASTER: '<:lol_master:1365067320061591663>',
    DIAMOND: '<:lol_diamond:1365067337170161665>',
    EMERALD: '<:lol_emerald:1365067353624412191>',
    PLATINUM: '<:lol_platinum:1365067371181506600>',
    GOLD: '<:lol_gold:1365067400168476785>',
    SILVER: '<:lol_silver:1365067428219977798>',
    BRONZE: '<:lol_bronze:1365067462227529901>',
    IRON: '<:lol_iron:1365067472470016032>',

    CLASH: '<:lol_clash:1365068958226583624>'
};

function getLoLTierEmoji(tier) {
    return lolTierEmojiMap[tier.toUpperCase()] ?? '';
}

module.exports = {
    lolTierEmojiMap,
    getLoLTierEmoji,
};
