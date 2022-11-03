// 
var express = require('express');
var router = express.Router();

let usersModel = require("../models/users");

router.post(
    "/register",
    async (req, res) => {
        const body = req.body;

        console.log("route", body);

        await usersModel.register(res, body);
});

router.post(
    "/login",
    async (req, res) => {
        const body = req.body;

        console.log("route", body);

        await usersModel.login(res, body);
});

module.exports = router;