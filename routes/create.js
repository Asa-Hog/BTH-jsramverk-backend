// Skapar ett nytt objekt
var express = require('express');
var router = express.Router();

let docsModel = require("../models/docsModel");

router.post("/", async (request, response) => {
    let newDoc = request.body;
    // console.log("newDoc create route", newDoc);
    const result = await docsModel.create(newDoc);
    // console.log("result:", result);

    // VAD VILL VI RETURNERA HÄR?? 201??
    // return response.json(result);
    return response.status(201).json( { data: result} );
});

module.exports = router;
