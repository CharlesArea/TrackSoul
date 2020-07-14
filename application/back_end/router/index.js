const express = require('express')
const router = express.Router()

const user = require("./user/index");
const appDetail = require("./appDetail/index");
const trackingPost = require("./trackingPost/index");

router.use('/user', user);
router.use('/appDetail', appDetail);
router.use('/trackingPost', trackingPost);
router.use("/", (req, res) => {
    res.json("Tracking API Server")
})

module.exports = router;
