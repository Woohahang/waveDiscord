// const mongoose = require('mongoose');
// const OldUser = require('./oldUserNickname'); // userNicknameDB 모델
// const NewUser = require('../mongoDB/userSchema'); // User 모델

// async function migrateData() {
//     // await mongoose.connect('mongodb://localhost:27017/waveDiscord'); // URI 수정 필요

//     const oldUsers = await OldUser.find();

//     for (const oldUser of oldUsers) {
//         const newUserData = {

//             userId: oldUser.userId,
//             steam: oldUser.steam,

//             leagueOfLegends: Array.isArray(oldUser.leagueOfLegends)
//                 ? oldUser.leagueOfLegends.map(name => ({
//                     summonerName: name,
//                     tier: null,
//                     rank: null,
//                     leaguePoints: 0
//                 }))
//                 : [],

//             teamfightTactics: oldUser.teamfightTactics,
//             valorant: oldUser.valorant,
//             steamBattleGround: oldUser.steamBattleGround,
//             kakaoBattleGround: oldUser.kakaoBattleGround,
//             rainbowSix: oldUser.rainbowSix,
//             blizzard: oldUser.blizzard,
//             overWatchTwo: oldUser.overWatchTwo,
//             lostArk: oldUser.lostArk,

//         };

//         await NewUser.updateOne(
//             { userId: newUserData.userId },
//             newUserData,
//             { upsert: true } // 없으면 삽입, 있으면 갱신
//         );
//     }

//     console.log('✅ 마이그레이션 완료');
//     mongoose.disconnect();
// }

// migrateData().catch(console.error);
