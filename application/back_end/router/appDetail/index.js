"use strict";
const express = require('express');
const router = express.Router();
const path = require("path");
const {updateFun, userCountFun, getTrackRequest} = require("./utils")


router.use('/updateAppList', (req, res) => {
    // var appList = JSON.parse(req.body.appList)
    // console.log(req.body)
    updateFun(req.body, res)
})

router.post('/getUserCount', (req, res) => {
    userCountFun(req.body.token, res)
})

router.post('/getTrackRequest', (req, res) => {
    getTrackRequest(req.body.token, res)
})

module.exports = router;
