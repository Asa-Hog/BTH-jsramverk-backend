// Uppdaterar ett objekt
var express = require('express');
var router = express.Router();

let docsModel = require("../models/docsModel");


router.put("/", async (request, response) => {
    let currentDoc = request.body;

    const result = await docsModel.update(currentDoc);
    // console.log("result:", result);

    // VILL VI RETURNERA NEDAN PÅ SAMMA SÄTT SOM FÖR CREATE?? Nej status 200 för put
    // return response.json(result);
    return response.status(200).json( { data: result} );


    // Gör en koll så response/result status blev 201 - dvs att dokumentet skapades
    // console.log(response.status(201).json(result)); //undefined - ger error
    // console.log(result.result.ops); //undefined - ger error
    //  if (result.result.ok) {
    //     return res.status(201).json({ data: result.ops });
    // }
    // return result.data; // Skriver jag in detta som det ska vara får jag undefined
});

module.exports = router;
