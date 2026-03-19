const MongoUserRepository = require('@infrastructure/database/mongo/repositories/mongoUserRepository');
const MongoGuildRepository = require('@infrastructure/database/mongo/repositories/mongoGuildRepository');

const MemoryUserCacheRepository = require('@infrastructure/cache/memory/memoryUserCacheRepository');
const MemoryGuildCacheRepository = require('@infrastructure/cache/memory/memoryGuildCacheRepository');

const GameProfileGatewayImpl = require('@infrastructure/external/GameProfileGatewayImpl');

const RegisterNicknameUseCase = require('@application/nickname/usecases/registerNicknameUseCase');
const RemoveNicknameUseCase = require('@application/nickname/usecases/removeNicknameUseCase');
const GetRemovableNicknamesUseCase = require('@application/nickname/usecases/getRemovableNicknamesUseCase');

const SyncGuildInfoUseCase = require('@application/guild/usecases/syncGuildInfoUseCase');
const SendMainChannelUIUseCase = require('@application/guild/usecases/sendMainChannelUIUseCase');
const SendAdminChannelUIUseCase = require('@application/guild/usecases/sendAdminChannelUIUseCase');
// const VoiceProfileService = require("@domain/voice/services/VoiceProfileService");               // 리팩터링 예정
// const SendVoiceProfileUseCase = require("@application/voiceProfile/SendVoiceProfileUseCase");    // 리팩터링 예정

/**
 * 애플리케이션에서 사용할 의존성을 조립합니다.
 *
 * 각 계층의 구현체를 생성하고,
 * 유스케이스에 필요한 의존성을 연결한 뒤 반환합니다.
 *
 * @returns {Object} 조립된 유스케이스 목록
 */
module.exports = function createDependencies() {

    // Repository, Service, External API ,Database, Cache 보통 DI는 이런 것들만 한다.
    const userRepository = new MongoUserRepository();
    const guildRepository = new MongoGuildRepository();

    const userCacheRepository = new MemoryUserCacheRepository();
    const guildCacheRepository = new MemoryGuildCacheRepository();

    const gameProfileGateway = new GameProfileGatewayImpl();

    const registerNicknameUseCase =
        new RegisterNicknameUseCase({ userRepository, userCacheRepository, gameProfileGateway });

    const removeNicknameUseCase =
        new RemoveNicknameUseCase({ userRepository, userCacheRepository });

    const getRemovableNicknamesUseCase =
        new GetRemovableNicknamesUseCase({ userRepository, userCacheRepository });

    const syncGuildInfoUseCase =
        new SyncGuildInfoUseCase({ guildRepository, guildCacheRepository });

    const sendMainChannelUIUseCase =
        new SendMainChannelUIUseCase({ guildRepository, guildCacheRepository });

    const sendAdminChannelUIUseCase =
        new SendAdminChannelUIUseCase({ guildRepository, guildCacheRepository });

    // const voiceProfileService =
    // new VoiceProfileService(userRepository, guildRepository)            // 리팩터링 예정
    // const sendVoiceProfileUseCase =
    // new SendVoiceProfileUseCase(voiceProfileService)             // 리팩터링 예정

    return {
        registerNicknameUseCase,
        removeNicknameUseCase,
        getRemovableNicknamesUseCase,

        gameProfileGateway,

        syncGuildInfoUseCase,
        sendMainChannelUIUseCase,
        sendAdminChannelUIUseCase,
    }

}