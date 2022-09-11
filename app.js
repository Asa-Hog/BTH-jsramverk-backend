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

const app = express();
// const port = 1337;
const port = process.env.PORT || 1337; // Emil hade 8976

// //////////%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
// app.use(bodyParser.json); // Emil hade
// app.use(bodyParser.urlencoded({ extended: true })); // Emil hade

// Ett annat sätt att uppnå samma funktionalitet finns numer tillgängligt direkt i express.
app.use(express.json()); // url-encodar mellanslag, åäö mm för delete, post, put-metoderna
// Ovanstående rad gör att url-encodning utförs på alla get, post, put, delete i hela appen. Annars används det bara för get (från webbläsaren automatiskt)

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
// Middleware takes three parameters.
// Om du vill att denna middleware alltid skall anropas så behöver du lägga den högst upp i din kod.
app.use((req, res, next) => {
    console.log(req.method);
    console.log(req.path);
    next();
});

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

app.use('/', index);
app.use('/docs', docs);
app.use('/reset', reset);
app.use('/create', create);
app.use('/update', update);

// app.get("/hello/:msg", (req, res) => {
//     const data = {
//         data: {
//             msg: req.params.msg
//         }
//     };

//     res.json(data);
// });

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

// Start up server
app.listen(port, () => console.log(`Example API listening on port ${port}!`));
