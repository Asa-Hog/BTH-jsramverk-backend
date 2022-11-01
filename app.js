require('dotenv').config(); // Pga lösenord för atlas

const express = require("express");
const cors = require('cors');
const morgan = require('morgan');
// const bodyParser = require('body-parser'); //Emil hade denna
const index = require('./routes/index');
const docs = require('./routes/docs');
const reset = require('./routes/reset');
const create = require('./routes/create');
const update = require('./routes/update');
const docsModel = require('./models/docsModel');

const app = express();
const httpServer = require("http").createServer(app);

// const port = 1337;
const port = process.env.PORT || 1337; // Emil hade 8976
let throttleTimer;

// app.use(bodyParser.json); // Emil hade
// app.use(bodyParser.urlencoded({ extended: true })); // Emil hade

// Ett annat sätt att uppnå samma funktionalitet finns numer tillgängligt direkt i express.
app.use(express.json()); // url-encodar mellanslag, åäö mm för delete, post, put-metoderna
// Ovanstående rad gör att url-encodning utförs på alla get, post, put, delete
// i hela appen. Annars används det bara för get (från webbläsaren automatiskt)

app.use(cors());
app.options('*', cors()); //Emil hade
app.disable('x-powered-by'); //Emil hade

//Loggning
// don't show the log when it is test
if (process.env.NODE_ENV !== 'test') {
    // use morgan to log at command line
    app.use(morgan('combined')); // 'combined' outputs the Apache style LOGs
}

// This is middleware called for all routes.
// Om du vill att denna middleware alltid skall anropas så behöver du lägga den högst upp i din kod.
app.use((req, res, next) => {
    console.log(req.method);
    console.log(req.path);
    next();
});

app.use('/', index);
app.use('/docs', docs);
app.use('/reset', reset);
app.use('/create', create);
app.use('/update', update);

// Add routes for 404 and error handling
// Catch 404 and forward to error handler
// Put this last
app.use((req, res, next) => {
    var err = new Error("Not Found");

    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }

    res.status(err.status || 500).json({
        "errors": [
            {
                "status": err.status,
                "title":  err.message,
                "detail": err.message
            }
        ]
    });
});


const io = require("socket.io")(httpServer, {
    cors: {
      origin: "*", // "http://localhost:3000"
      methods: ["GET", "POST"]
    }
});


io.sockets.on('connection', function(socket) {
    console.log("CONNECTION with socket id: ", socket.id);

    socket.on('create', function(id) {
        console.log("room ", id);
        socket.join(id); // Joinar på id:t för dokumentet
    });

    socket.on('changedText', function(doc) {
        console.log("2 received in server & sent to client in room", doc);
        socket.to(doc["_id"]).emit("changedText", doc);


        clearTimeout(throttleTimer); // Cleara timeouten för att starta om den på nytt
        console.log("writing");
        throttleTimer = setTimeout(function() {
            console.log("now saving to database")
            docsModel.update(doc); // Börjar spara dokumentet. Kommer det in ny data inom 2 s så clearas data/ sparningen, och ny sparning görs
        }, 2000);
    });

});

// Start up server
const server = httpServer.listen(port, () => {
    console.log(`Editor API listening on port ${port}!`);
});

module.exports = server;







// Add a route ------------------------- svarar med text

// app.get("/", (req, res) => {
//     res.send("Hello World");
//     });
// Add a route ------------------------- svarar med json
// app.get("/", (req, res) => {
//     const data = {
//         data: {
//             msg: "Hello World"
//         }
//     };
//     res.json(data); //Detta gör om response till json-format

// app.get("/hello/:msg", (req, res) => {
//     const data = {
//         data: {
//             msg: req.params.msg
//         }
//     };

//     res.json(data);
// });