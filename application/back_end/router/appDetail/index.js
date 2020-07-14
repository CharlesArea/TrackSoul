"use strict";
const express = require('express');
const router = express.Router();
const path = require("path");
const {updateFun} = require("./utils")


router.use('/updateAppList', (req, res) => {
    // var appList = JSON.parse(req.body.appList)
    // console.log(req.body)
    updateFun(req.body, res)
})

module.exports = router;
