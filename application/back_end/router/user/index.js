"use strict";
const express = require('express');
const router = express.Router();
const path = require("path");
const {loginFun, registFun, getInfoFun, logoutFun} = require("./utils")


router.use('/login', (req, res) => {
    var {username, password} = req.body
    loginFun(username, password, res)
    // res.send({'message': 'error', 'status_code': 400})
})

router.use('/register', (req, res) => {
    var {username, password} = req.body
    registFun(username, password, res)
})

router.use('/info', (req, res) => {
    var {token} = req.query
    getInfoFun(token, res)
})

router.use('/logout', (req, res) => {
    var {token} = req.query
    logoutFun(token, res)
})

module.exports = router;
