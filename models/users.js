const database = require("../db/database");
const { ObjectId } = require('mongodb').ObjectId;

const validator = require("email-validator");
const bcrypt = require("bcryptjs");
const saltRounds = 10;
const jwt = require('jsonwebtoken');

const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const users = {
    currentUser: "",

    register: async function register(res, body) {
        const email = body.email;
        const password = body.password;

        if (!email || !password) {
            return res.status(400).json({
                errors: {
                    status: 400,
                    message: "E-mail or password is missing"
                }
            });
        }

        // Eftersom vi har return i if-satsen kommer koden nedan aldrig köras om vi får fel
        if (!validator.validate(email)) {
            return res.status(400).json({
                errors: {
                    status: 400,
                    message: "E-mail is not in correct format"
                }
            });
        }

        bcrypt.hash(password, saltRounds,
            async function (err, hash) {
                if (err) {
                    return res.status(500).json({
                        errors: {
                            status: 500,
                            message: "Could not hash password"
                        }
                    });
                }

                let db = await database.getDb("users");

                try {
                    // Ta anv o lägg in i databasen
                    const doc = {
                        email: email,
                        password: hash, // hash som vi fått från bcrypt
                    };

                    // console.log(doc);
                    // console.log(db.collection);
                    const result = await db.collection.insertOne(doc);

                    return res.status(201).json({
                        data: {
                            message: "User successfully created"
                        }
                    });

                } catch (error) {
                    return res.status(500).json({
                        errors: {
                            status: 500,
                            message: "Could not create new user"
                        }
                    });
                } finally {
                    await db.client.close();
                }
                // return res.status(201).json({
                //     data: hash
                // });
            });
    },

    login: async function login(res, body) {
        const email = body.email;
        const password = body.password;

        if (!email || !password) {
            return res.status(400).json({
                errors: {
                    status: 400,
                    message: "E-mail or password is missing"
                }
            });
        }
        // Vi vill hämta anv från databasen som har den epost-adressen
        // Nedan skapar en ny collection "users"/ hämtar users från databasen
        let db = await database.getDb("users");

        try {
            const query = {email: email};
            const user = await db.collection.findOne(query);


            if (user) {
                return users.comparePasswords(res, user, password);
            }


            return res.status(401).json({
                data: {
                    message: "User does not exist"
                }
            });


        } catch (error) {
            return res.status(500).json({
                errors: {
                    status: 500,
                    message: "Could not find user"
                }
            });
        } finally {
            console.log("User found", email);
            this.currentUser = email;
            await db.client.close();
        }
    },

    comparePasswords: async function comparePasswords(res, user, password) {
        bcrypt.compare(password, user.password, function(err, result) {
            if (err) {
                return res.status(500).json({
                    errors: {
                        status: 500,
                        message: "Could not decrypt password"
                    }
                });
            }

            if (result) {
                const payload = { email: user.email };
                const secret = process.env.JWT_SECRET;

                const token = jwt.sign(payload, secret, {
                    expiresIn: "1h"
                });

                return res.status(201).json({
                    data: {
                        _id: user["_id"],
                        email: user.email,
                        token: token
                    }
                });
            }

            return res.status(401).json({
                errors: {
                    status: 401,
                    message: "Password not correct"
                }
            })
        });
    },

    checkToken: function checkToken(req, res, next) {
        const token = req.headers["x-access-token"];

        jwt.verify(token, process.env.JWT_SECRET, function
            (err, decoded) {
                if (err) {
                    return res.status(401).json({
                        errors: {
                            status: 401,
                            message: "Token is not valid"
                        }
                    })

                }
                next();
            });
    },

    getAllUsers: async function getAllUsers() {
        let db;

        try {
            db = await database.getDb("users");
            const allUsers = await db.collection.find({}).toArray();

            return allUsers;

            } catch (error) {
            return {
                errors: {
                    message: error.message
                }
            };
        } finally {
            await db.client.close();
        }
    },

    invite: async function invite(res, body) {
        console.log("2 backend usersmodel");

        let currentUser = this.currentUser;
        let email = body.email;

        email = "asho20@student.bth.se"; // Ta bort
        let site = "https://www.student.bth.se/~asho20/editor/";

        const message = {
            to: email,
            from: 'asho20@student.bth.se', // currentUser? Nej. Ändra till namn Texteditor?
            subject: "Invitation to edit document",
            text: `Hi!
             ${currentUser} has given you the opportunity to edit a document in Text Editor. Register at https://www.student.bth.se/~asho20/editor/ to get going!
            /Team behind Text Editor`,
 
            html:`<p>Hi!</p> <p>${currentUser} has given you the opportunity to edit a document in Text Editor. Register <a href = ${site}>here</a> to get going!</p> <p>/Team behind Text Editor</p>`
        };

        try {
            let res = await sgMail.send(message);
            return res;
        } catch (error) {
            console.error(error);
        
            if (error.response) {
            console.error(error.response.body)
            }
            return error;
        }
    }
};

module.exports = users;
