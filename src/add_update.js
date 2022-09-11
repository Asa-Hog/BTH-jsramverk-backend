// Lägga till och uppdatera data

// Om vi vill lägga till ett dokument med attributen name och html gör vi på följande sätt.


const doc = {
    name: body.name,
    html: body.html,
};

const result = await db.collection.insertOne(doc);

// MongoDB lägger automatiskt till ett _id fält i dokumentet/objektet och vi kan kolla om allt gått bra och titta på det objekt vi har lagt till med följande kod. result.ops innehåller det objekt som har lagts till i databasen bland annat det automatgenererade _id.

if (result.result.ok) {
    return res.status(201).json({ data: result.ops });
}

// Detta _id behövs sedan när vi vill uppdatera dokumentet i databasen. Vi gör det med funktionen updateOne. Först importerar vi ObjectId funktionen för att kunna hitta rätt _id i databasen. Vi skapar sedan ett filter och ett updateDocument och använder oss av updateOne. Bara de fält som skickas in uppdateras, vill vi ersätta dokumentet istället kan vi använda replaceOne.

// const ObjectId = require('mongodb').ObjectId;

// const filter = { _id: ObjectId(body["_id"]) };
// const updateDocument = {
//     name: body.name,
//     html: body.html,
// };

// const result = await db.collection.updateOne(
//     filter,
//     updateDocument,
// );
