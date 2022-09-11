// Hämtar alla objekt i databasen
var express = require('express');
var router = express.Router();

let docsModel = require("../models/docsModel");


router.get("/", async (request, response) => {

    const allDocs = await docsModel.getAllDocs();

    return response.json({ 
        data: allDocs
    });
});


module.exports = router;