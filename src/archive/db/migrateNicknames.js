// require('module-alias/register');
// const mongoose = require('mongoose');
// const User = require('./mongoDB/userSchema'); // 경로는 프로젝트 구조에 맞게 수정
// const GAME_TYPES = require('@constants/gameTypes');
// const { mongoURI } = require('../../config.json');
// const logger = require('@utils/logger');

// let userck;

// async function migrateNicknames() {
//     try {

//         await mongoose.connect(mongoURI); // URI 수정

//         const users = await User.find();

//         for (const user of users) {
//             let modified = false;

//             // 스팀 필드 삭제
//             // user[GAME_TYPES.STEAM].forEach(entry => {
//             //     console.log('첫 번째 entry.playerName:', entry.playerName);
//             //     if (entry.playerName) {
//             //         entry.set('playerName', undefined, { strict: false });
//             //         modified = true;
//             //     }
//             //     console.log('두 번째 entry.playerName:', entry.playerName);
//             //     return entry;
//             // });

//             // 🎯 STEAM 닉네임 변경
//             // user[GAME_TYPES.STEAM] = user[GAME_TYPES.STEAM].map(entry => {
//             //     if (entry.playerName) {
//             //         const newEntry = {
//             //             ...entry,
//             //             nickname: entry.playerName,
//             //         };

//             //         // delete newEntry.playerName; // ✅ 필드 제거
//             //         modified = true;
//             //         return newEntry;
//             //     }
//             //     return entry;
//             // });


//             // 🎯 리그오브레전드 닉네임 변경
//             // user[GAME_TYPES.LEAGUE_OF_LEGENDS] = user[GAME_TYPES.LEAGUE_OF_LEGENDS].map(entry => {

//             //     if (entry.summonerName) {
//             //         const newEntry = {
//             //             ...entry,
//             //             nickname: entry.summonerName
//             //         };

//             //         modified = true;
//             //         return newEntry;
//             //     }
//             //     return entry;
//             // })

//             // 롤 필드 삭제
//             // user[GAME_TYPES.LEAGUE_OF_LEGENDS].forEach(entry => {
//             //     userck = user;
//             //     console.log('첫 번째 entry.summonerName:', entry.summonerName);
//             //     if (entry.summonerName) {
//             //         entry.set('summonerName', undefined, { strict: false });
//             //         modified = true;
//             //     }
//             //     console.log('두 번째 entry.summonerName:', entry.summonerName);
//             //     return entry;
//             // });


//             if (modified) {
//                 await user.save();
//                 console.log(`✅ Updated user ${user.userId}`);
//             }
//         }

//         console.log('🎉 Migration complete.');
//         mongoose.disconnect();
//     } catch (error) {
//         logger.error('오류', {
//             userck,
//             stack: error.stack
//         })
//     }
// }

// migrateNicknames().catch(err => {
//     console.error('❌ Migration failed:', err);
//     mongoose.disconnect();
// });