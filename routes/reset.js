// Initierar databasen
var express = require('express');
var router = express.Router();

let docsModel = require("../models/docsModel");


router.get("/", async (request, response) => {

    await docsModel.reset();

    return;
});


module.exports = router;