// 
var express = require('express');
var router = express.Router();

let usersModel = require("../models/users");

router.post(
    "/register",
    async (req, res) => {
        const body = req.body;

        await usersModel.register(res, body);
});

router.post(
    "/login",
    async (req, res) => {
        const body = req.body;

        await usersModel.login(res, body);
});

router.get(
    "/currentUser",
    (req, res) => {
        const currentUser = usersModel.currentUser;

        return res.json({
            data: currentUser
        });
});

router.get(
    "/invite/:email",
    async (req, res) => {
        const body = req.params;
        // console.log(body);

        let result = await usersModel.invite(res, body);

        return res.json({
            data: result
        });
});


module.exports = router;