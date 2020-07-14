"use strict";
const express = require('express');
const router = express.Router();
const { clickPostFun, reqPostFun } = require("./utils")

router.post('/', (req, res) => {
    console.log('on Development')
    console.log(req.body)
})

router.post('/general', (req, res) => {
    console.log('on Development')
    console.log(req.body)
})

router.post('/request', (req, res) => {
    console.log("Im in request API")
    reqPostFun(req.body, res)
})

router.post('/click', (req, res) => {
    // console.log(req.body)
    clickPostFun(req.body, res)
})


module.exports = router;
