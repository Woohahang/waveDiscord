const buildAdminMenuSelect = require('../components/buildAdminMenuSelect');
const buildAdminActionButtons = require('../components/buildAdminActionButtons');

const ADMIN_CHANNEL_MESSAGE =
    '# ⭐ Wave 관리자 채널'

module.exports = function buildAdminChannelPayload() {
    return {
        content: ADMIN_CHANNEL_MESSAGE,
        components: [
            buildAdminMenuSelect(),
            buildAdminActionButtons(),
        ],
    };
};