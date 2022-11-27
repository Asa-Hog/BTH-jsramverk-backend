const database = require("../db/database");
const { ObjectId } = require('mongodb');
const usersModel = require("../models/users");

let docsModel = {

    reset: async function init() {
        let db;

        try {
            // Radera alla användare
            db = await database.getDb("users");

            await db.collection.deleteMany({});

            // Radera allt innehåll i databasen och lägg till grundinnehåll
            db = await database.getDb();

            await db.collection.deleteMany({});

            let result = await db.collection.insertMany([
                {
                    "name": "Inköpslista",
                    "html":`Tomater, mjölk, bröd`,
                    "owner": "Asa_4@hotmail.com",
                    "allowedUsers": ["Asa_4@hotmail.com"],
                    "docType": "text",
                    "comments": [{"range": [0, 7], "commentText": "Glöm inte", "createdBy" : "Asa_4@hotmail.com"}, {"range": [16, 20], "commentText": "Köp ett gott!", "createdBy" : "Asa_4@hotmail.com"}]
                },
                {
                    "name": "Saga",
                    "html": "Det var en gång...",
                    "owner": "Asa_4@hotmail.com",
                    "allowedUsers": ["Asa_4@hotmail.com", "efo@bth.se"],
                    "docType": "text",
                    "comments": []
                    
                },
                {
                    "name": "Diktsamling",
                    "html": "En blå viol...",
                    "owner": "efo@bth.se",
                    "allowedUsers": ["efo@bth.se"],
                    "docType": "text",
                    "comments": []
                },
                {
                    "name": "Roman",
                    "html": "Det var en kall natt i februari...",
                    "owner": "efo@bth.se",
                    "allowedUsers": ["efo@bth.se", "Asa_4@hotmail.com"],
                    "docType": "text",
                    "comments": [{"range": [23, 31], "commentText": "Ändra till mars?", "createdBy" : "Asa_4@hotmail.com"}]
                },
                {
                    "name": "Calculation",
                    "html": "let a = 3;\nlet b = 4; \nconsole.log(a*b);",
                    "owner": "Asa_4@hotmail.com",
                    "allowedUsers": ["efo@bth.se", "Asa_4@hotmail.com"],
                    "docType": "code",
                    "comments": []
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

            // Lämna bara ut de dokument som tillhör allowedUser (alla owners blir automatiskt en allowed user)
            filteredDocs = allDocs.filter(function(doc) {
                let allowedUsersDocs = doc.allowedUsers.includes(usersModel.currentUser);

                return allowedUsersDocs; 
            });

            return filteredDocs;
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
            const comments = currentDoc.comments;
            console.log(comments);

            const result = await db.collection.updateOne(
                filter, {$set: {html: html, comments: comments}});

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


    addEditor: async function addEditor(data) {
        let db;

        let doc = data.doc;
        let email = data.email;
        let allowedUsers = doc.allowedUsers;

        allowedUsers.push(email);

        try {
            db = await database.getDb();

            // filter - det objekt som ska uppdateras
            const filter = { _id: ObjectId(doc["_id"]) };

            const result = await db.collection.updateOne(
                filter, {$set: {allowedUsers: allowedUsers}});

            return {
                ...doc,
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
    }
};

// return docsModel;
module.exports = docsModel;
