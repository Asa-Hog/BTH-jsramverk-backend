// /**
//  * Connect to the database and search using a criteria.
//  */
// "use strict";

// const mongo = require("mongodb").MongoClient;
// const dsn =  process.env.DBWEBB_DSN || "mongodb://localhost:27017/mumin";

// // SÖKKRITERIER 1 ------Find documents for this living in...
// =====================================
// const criteria1 = {
//     bor: "Mumindalen"
// };
// const projection1 = {
//     namn: 1,
//     bor: 1,
//     _id: 0
// };
// const limit1 = 3;

// // SÖKKRITERIER 2 ------Find documents where namn starts with string ============================
// // const criteria2 = {
// //     namn: /^Sn/
// // };
// // const projection2 = {
// //     _id: 1,
// //     namn: 1
// // };
// // const limit2 = 3;

// // SÖKVARIANT 1 ================================================
// ( () => {
//     // Find using .then() --- CRITERIA 1 ---
//     findInCollection(dsn, "crowd", criteria1, projection1, limit1)
//         .then(res => console.log(res))
//         .catch(err => console.log(err));
// })();
// // SLUT VARIANT 1 ============================================

// // SÖKVARIANT 2 ================================================
// // // Do it within an Immediately Invoked Async Arrow Function.
// // // This is to enable usage of await within the function scope.
// //
// // (async () => {
// //     // Find using await --- CRITERIA 2 ---
// //     try {
// //         let res = await findInCollection(
// //             dsn, "crowd", criteria2, projection2, limit2
// //         );
// //         console.log(res);
// //     } catch (err) {
// //         console.log(err);
// //     }
// // })();
// // SLUT VARIANT 2 ============================================



// /**
//  * Find documents in an collection by matching search criteria.
//  *
//  * @async
//  *
//  * @param {string} dsn        DSN to connect to database.
//  * @param {string} colName    Name of collection.
//  * @param {object} criteria   Search criteria.
//  * @param {object} projection What to project in results.
//  * @param {number} limit      Limit the number of documents to retrieve.
//  *
//  * @throws Error when database operation fails.
//  *
//  * @return {Promise<array>} The resultset as an array.
//  */
// // en funktion som kopplar sig mot databasen och en colletion
// // samt utför själva find-operationen.
// // Funktionen använder konstruktionen async/await för att serialisera flödet mot databasen.
// Varje metod som jobbar mot databasen här är asynkron och har alternativet att använda callbacks,
// eller Promise. I koden här bygger vi på att ett Promise returneras när respektive metod är
// avklarad.
// async function findInCollection(dsn, colName, criteria, projection, limit) {
//     const client  = await mongo.connect(dsn);
//     const db = await client.db();
//     const col = await db.collection(colName);
//     const res = await col.find(criteria, projection).limit(limit).toArray();

//     await client.close();

//     return res;
// }
