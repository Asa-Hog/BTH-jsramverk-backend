const database = require("../db/database");
const { ObjectId } = require('mongodb');

let docsModel = {

    reset: async function init() {
        let db;

        try {
            db = await database.getDb();

            await db.collection.deleteMany({});
            let result = await db.collection.insertMany([
                {
                    "name": "Inköpslista",
                    "html": "Tomater"
                },
                {
                    "name": "Saga",
                    "html": "Det var en gång..."
                },
                {
                    "name": "Diktsamling",
                    "html": "En blå viol.."
                }
            ]);

            return result;
        } catch (error) {
            return {
                errors: {
                    message: error.message
                }
            };
        } finally {
            await db.client.close();
        }
    },

    getAllDocs: async function getAllDocs() {
        let db;

        try {
            db = await database.getDb();
            const allDocs = await db.collection.find({}).toArray();
            // const res = await db.collection.find(criteria, projection).limit(limit).toArray();

            // console.log(allDocs);
            return allDocs;
        } catch (error) {
            return {
                errors: {
                    message: error.message
                }
            };
        } finally {
            await db.client.close();
        }
    },


    create: async function create(newDoc) {
        let db;

        try {
            db = await database.getDb();

            const result = await db.collection.insertOne(newDoc);

            return {
                ...newDoc,
                _id: result.insertedId,
            };
        } catch (error) {
            return {
                errors: {
                    message: error.message
                }
            };
        } finally {
            await db.client.close();
        }
    },

    update: async function update(currentDoc) {
        let db;

        try {
            db = await database.getDb();

            // filter - det objekt som ska uppdateras
            const filter = { _id: ObjectId(currentDoc["_id"]) };
            const html = currentDoc.html;

            const result = await db.collection.updateOne(
                filter, {$set: {html: html}});

            return {
                ...currentDoc,
                matchedCount: result.matchedCount,
            };
        } catch (error) {
            return {
                errors: {
                    message: error.message
                }
            };
        } finally {
            await db.client.close();
        }
    },


    // init: async function init() {
    //     // 23.40 insertMany FL2
    // },, data

};

// return docsModel;
module.exports = docsModel;
