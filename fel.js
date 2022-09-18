// let db;

// try {
//     db = await database.getDb();

//     const filter = { email: email };
//     const keyObject = await db.collection.findOne(filter);

//     if (keyObject) {
//         return res.json({ data: keyObject });
//     }
// } catch (e) {
//     return res.status(500).json({
//         errors: {
//             status: 500,
//             source: "/",
//             title: "Database error",
//             detail: e.message
//         }
//     });
// } finally {
//     await db.client.close();
// }

// Finally delen av konstuktionen utförs alltid både när det har gått bra och vid fel.
