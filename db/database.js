// bryta ut hanteringen av databas uppkopplingen till en egen modul.

const mongo = require("mongodb").MongoClient;
// const config = require("./config.json");


const database = {

    // let dsn = `mongodb://localhost:27017/folinodocs`;
    // let dsn = `mongodb://localhost:1337/list`;
    // let dsn = "mongodb://localhost:27017/editor";

    // NYA DATABASEN SKAPAD I MOLNET MONGODB ATLAS
    // let dsn = `mongodb+srv://${config.username}:${config.password}@cluster0.hkfbt.mongodb.net/
    // folinodocs?retryWrites=true&w=majority`;

    // let dsn = `mongodb+srv://${config.username}:${config.password}@cluster0.rgvmt.mongodb.net/
    // myFirstDatabase?retryWrites=true&w=majority`;

    // let dsn = `mongodb+srv://editor:pass@cluster-bth-jsramverk-e.yic4yta.mongodb.net/?
    // retryWrites=true&w=majority`;

    // let dsn = `mongodb+srv://${process.env.ATLAS_USERNAME}:${process.env.ATLAS_PASSWORD}
    // @cluster0.hkfbt.mongodb.net/folinodocs?retryWrites=true&w=majority`;

    // let dsn = `mongodb+srv://${config.username}:${config.password}@cluster0.hkfbt.mongodb.net/
    // folinodocs?retryWrites=true&w=majority`;


    getDb: async function getDb(collectionName="docs") {
        let dsn = `mongodb+srv://${process.env.ATLAS_USERNAME}:${process.env.ATLAS_PASSWORD}@cluster-bth-jsramverk-e.yic4yta.mongodb.net/?retryWrites=true&w=majority`;

        if (process.env.NODE_ENV === 'test') {
            dsn = "mongodb://localhost:27017/test";
        }

        const client  = await mongo.connect(dsn, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        const db = await client.db();
        const collection = await db.collection(collectionName);

        return {
            db: db,
            collection: collection,
            client: client,
        };
    }
};

module.exports = database;
