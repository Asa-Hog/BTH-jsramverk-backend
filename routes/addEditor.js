// Lägger till email till dokument i databasen
var express = require('express');
var router = express.Router();

let docsModel = require("../models/docsModel");


router.put("/", async (request, response) => {
    let doc = request.body;

    const result = await docsModel.addEditor(doc);

    return response.status(200).json( { data: result} );

});

module.exports = router;