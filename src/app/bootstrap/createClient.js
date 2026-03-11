const { Client, Partials, GatewayIntentBits } = require('discord.js');

function createClient() {

    const client = new Client({
        intents: [
            GatewayIntentBits.Guilds,               // 서버(Guild) 관련 기본 이벤트를 수신합니다. (봇 실행 및 서버 정보 접근에 필요)
            GatewayIntentBits.GuildVoiceStates,     // 음성 채널 입장 / 퇴장 등의 상태 변경 이벤트를 수신합니다.
            GatewayIntentBits.GuildMembers,         // 서버 멤버 정보 및 멤버 관련 이벤트를 수신합니다.
            GatewayIntentBits.MessageContent,       // 메시지 내용을 읽을 수 있도록 허용합니다. (messageCreate 등에서 필요)
        ],
        partials: [
            Partials.Channel                        // 캐시에 없는 채널 객체를 partial 상태로 수신하고, 필요 시 fetch()로 완전한 객체로 가져올 수 있도록 합니다.
        ]
    });

    return client;
}

module.exports = createClient;