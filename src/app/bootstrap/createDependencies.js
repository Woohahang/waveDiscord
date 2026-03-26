// MongoDB
const MongoUserRepository = require('@infrastructure/database/mongo/repositories/mongoUserRepository');
const MongoGuildRepository = require('@infrastructure/database/mongo/repositories/mongoGuildRepository');

// Cache
const MemoryUserCacheRepository = require('@infrastructure/cache/memory/memoryUserCacheRepository');
const MemoryGuildCacheRepository = require('@infrastructure/cache/memory/memoryGuildCacheRepository');
const InMemoryVoiceMessageStore = require('@infrastructure/cache/memory/inMemoryVoiceMessageStore');

// Service
const VoiceMessageService = require('@application/voice/services/voiceMessageService');

// API
const GameProfileGatewayImpl = require('@infrastructure/external/GameProfileGatewayImpl');

// Nickname
const RegisterNicknameUseCase = require('@application/nickname/usecases/registerNicknameUseCase');
const RemoveNicknameUseCase = require('@application/nickname/usecases/removeNicknameUseCase');
const GetRemovableNicknamesUseCase = require('@application/nickname/usecases/getRemovableNicknamesUseCase');

// User
const DeleteUserInfoUseCase = require('@application/user/usecases/deleteUserInfoUseCase');

// Guild
const SyncGuildInfoUseCase = require('@application/guild/usecases/syncGuildInfoUseCase');
const SendMainChannelUIUseCase = require('@application/guild/usecases/sendMainChannelUIUseCase');
const SendAdminChannelUIUseCase = require('@application/guild/usecases/sendAdminChannelUIUseCase');
const GetShowableGamesUseCase = require('@application/guild/usecases/getShowableGamesUseCase');
const GetHideableGamesUseCase = require('@application/guild/usecases/getHideableGamesUseCase');
const EnableGuildGamesUseCase = require('@application/guild/usecases/enableGuildGamesUseCase');
const DisableGuildGamesUseCase = require('@application/guild/usecases/disableGuildGamesUseCase');

// Voice
const SendVoiceProfileMessageUseCase = require('@application/voice/usecases/sendVoiceProfileMessageUseCase');
const GetGuildUIDataUseCase = require('@application/guild/usecases/getGuildUIDataUseCase');

/**
 * ==============================
 * Composition Root (DI 조립소)
 * ==============================
 * 모든 의존성을 생성하고 연결하는 곳
 */
module.exports = function createDependencies() {
    /**
     * Infrastructure 인스턴스 생성
     */
    const userRepository = new MongoUserRepository();
    const guildRepository = new MongoGuildRepository();

    const userCacheRepository = new MemoryUserCacheRepository();
    const guildCacheRepository = new MemoryGuildCacheRepository();

    const inMemoryVoiceMessageStore = new InMemoryVoiceMessageStore();

    // API
    const gameProfileGateway = new GameProfileGatewayImpl();

    // Service
    const voiceMessageService = new VoiceMessageService({ voiceMessageStore: inMemoryVoiceMessageStore });

    // UseCase
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

    const sendVoiceProfileMessageUseCase =
        new SendVoiceProfileMessageUseCase({ userRepository, guildRepository, userCacheRepository, guildCacheRepository });

    const getShowableGamesUseCase =
        new GetShowableGamesUseCase({ guildRepository, guildCacheRepository });

    const getHideableGamesUseCase =
        new GetHideableGamesUseCase({ guildRepository, guildCacheRepository });

    const enableGuildGamesUseCase =
        new EnableGuildGamesUseCase({ guildRepository, guildCacheRepository });

    const disableGuildGamesUseCase =
        new DisableGuildGamesUseCase({ guildRepository, guildCacheRepository });

    const getGuildUIDataUseCase =
        new GetGuildUIDataUseCase({ guildRepository, guildCacheRepository });

    // User
    const deleteUserInfoUseCase =
        new DeleteUserInfoUseCase({ userRepository, userCacheRepository })

    return {
        // nickname
        registerNicknameUseCase,
        removeNicknameUseCase,
        getRemovableNicknamesUseCase,

        // external
        gameProfileGateway,

        // user
        deleteUserInfoUseCase,

        // guild
        syncGuildInfoUseCase,
        sendMainChannelUIUseCase,
        sendAdminChannelUIUseCase,
        getShowableGamesUseCase,
        getHideableGamesUseCase,
        enableGuildGamesUseCase,
        disableGuildGamesUseCase,
        getGuildUIDataUseCase,

        // voice
        sendVoiceProfileMessageUseCase,
        voiceMessageService,
    }

}