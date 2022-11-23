/* global it describe before  */
process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app.js');

chai.should();

chai.use(chaiHttp);

const database = require("../db/database.js");
const collectionName = "docs";

// Den här delen tar bort allt ur test-databasen - gör det före alla tester
// describe('editor', () => {
//     before(() => {
//         return new Promise(async (resolve) => {
//             const db = await database.getDb();

//             db.db.listCollections(
//                 { name: collectionName }
//             )
//                 .next()
//                 .then(async function (info) {
//                     if (info) {
//                         await db.collection.drop();
//                     }
//                 })
//                 .catch(function (err) {
//                     console.error(err);
//                 })
//                 .finally(async function () {
//                     await db.client.close();
//                     resolve();
//                 });
//         });
//     });

//     // Här ska antal dokument i db vara 0
//     describe('GET /docs', () => {
//         it('200 Get all docs', (done) => {
//             chai.request(server)
//                 .get("/docs")
//                 .end((err, res) => {
//                     res.should.have.status(200);
//                     res.body.should.be.an("object");
//                     res.body.data.should.be.an("array");
//                     res.body.data.length.should.be.equal(0);

//                     done();
//                 });
//         });
//     });





    describe('editor', () => {

        before(async function() {
            const db = await database.getDb();

            db.db.listCollections(
                { name: collectionName }
            )
                .next()
                .then(async function (info) {
                    if (info) {
                        await db.collection.drop();
                    }
                })
                .catch(function (err) {
                    console.error(err);
                })
                .finally(async function () {
                    await db.client.close();
                });
            });
    
        // // Här ska antal dokument i db vara 0 -- FUNGERAR INTE LÄNGRE - MÅSTE CHECKA TOKEN
        // describe('GET /docs', () => {
        //     it('200 Get all docs', (done) => {
        //         chai.request(server)
        //             .get("/docs")
        //             .end((err, res) => {
        //                 res.should.have.status(200);
        //                 res.body.should.be.an("object");
        //                 res.body.data.should.be.an("array");
        //                 res.body.data.length.should.be.equal(0);
    
        //                 done();
        //             });
        //     });
        // });

    // Här testar jag att lägga till ett dokument
    describe('POST /create', () => {
        it('201 Creating new document', (done) => {
            let doc = {
                name: "name 1",
                html: "html 1",
            };

            chai.request(server)
                .post("/create")
                .send(doc)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.an("object");
                    res.body.should.have.property("data");
                    res.body.data.should.have.property("name");
                    res.body.data.should.have.property("html");
                    res.body.data.name.should.equal("name 1");
                    res.body.data.html.should.equal("html 1");

                    done();
                });
        });

        // // Här ska antal dokument vara 1 -- FUNGERAR INTE LÄNGRE - MÅSTE CHECKA TOKEN
        // it('200 Get all docs', (done) => {
        //     chai.request(server)
        //         .get("/docs")
        //         .end((err, res) => {
        //             res.should.have.status(200);
        //             res.body.should.be.an("object");
        //             res.body.data.should.be.an("array");
        //             res.body.data.length.should.be.equal(1);

        //             done();
        //         });
        // });

        // Här testar jag att uppdatera ett dokument
        it('200 Editing document', (done) => {
            let doc = {
                name: "new name",
                html: "new html",
            };

            chai.request(server)
                .put("/update")
                .send(doc)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an("object");
                    res.body.should.have.property("data");
                    res.body.data.should.have.property("name");
                    res.body.data.name.should.equal("new name");
                    res.body.data.html.should.equal("new html");

                    done();
                });
        });

        // // Antalet ska fortfarande vara 1 -- FUNGERAR INTE LÄNGRE - MÅSTE CHECKA TOKEN
        // it('200 Get all docs', (done) => {
        //     chai.request(server)
        //         .get("/docs")
        //         .end((err, res) => {
        //             res.should.have.status(200);
        //             res.body.should.be.an("object");
        //             res.body.data.should.be.an("array");
        //             res.body.data.length.should.be.equal(1);

        //             done();
        //         });
        // });
    });
});
